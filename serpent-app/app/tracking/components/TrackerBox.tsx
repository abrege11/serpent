"use client";

import React, { useState, useEffect } from "react";
import { Box } from "../../dashboard/components/Box";
import styles from "./TrackerBox.module.css";

interface Props {
  userId: string;
  refreshSessions: () => void;
}

export function TrackerBox({ userId, refreshSessions }: Props) {
  // state variables
  const [time, setTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [currentStart, setCurrentStart] = useState<Date | null>(null);
  const [intervals, setIntervals] = useState<any[]>([]);
  const [activities, setActivities] = useState<string[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  // timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let startTimestamp = currentStart?.getTime();

    if (isRunning && startTimestamp) {
      interval = setInterval(() => {
        const now = Date.now();
        setTime(Math.floor((now - startTimestamp) / 1000));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, currentStart]);



  // 'what're you working on' data
  useEffect(() => {
    const fetchActivities = async () => {
      const res = await fetch("/api/activity/recent");
      const data = await res.json();
      const labels = data.map((entry: any) => {
        switch (entry.type) {
          // repo name instead of commit message
          case "commit":
            return `${entry.extra}`;
          case "leetcode":
            return `${entry.label} (${entry.extra})`;
          case "session":
            return entry.label;
          case "top":
            return entry.label;
          default:
            return entry.label;
        }
      });
      setActivities(Array.from(new Set(labels)));
    };
    fetchActivities();
  }, []);

  const handleStartStop = () => {
    if (isRunning) {
      const stopTime = new Date();
      if (currentStart && selectedActivity) {
        setIntervals((prev) => [
          ...prev,
          {
            start: currentStart.toISOString(),
            end: stopTime.toISOString(),
            activity: selectedActivity,
          },
        ]);
        setTotalTime((prev) => prev + Math.floor((stopTime.getTime() - currentStart.getTime()) / 1000));
      }
      setCurrentStart(null);
      setIsRunning(false);
      setTime(0);
    } else {
      if (!sessionStarted) setSessionStarted(true);
      setCurrentStart(new Date());
      setIsRunning(true);
    }
  };

  // stop the timer and allow save
  const handleEnd = () => {
    if (isRunning) handleStartStop();
    setSessionEnded(true);
  };

  // save
  const handleSave = async () => {
    if (!sessionStarted || intervals.length === 0) {
      alert("No session to save!");
      return;
    }

    const payload = {
      userId,
      intervals,
    };

    const res = await fetch("/api/tracking/session/save", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      alert("Session saved!");
      refreshSessions();
      setSessionStarted(false);
      setSessionEnded(false);
      setTime(0);
      setTotalTime(0);
      setIntervals([]);
      setSelectedActivity(null);
    } else {
      alert("Error saving session.");
    }
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <Box width="100%" height="100%">
      <div className={styles.section}>
        <h4 className={styles.heading}>start tracking</h4>

        <div className={styles.trackerLayout}>
          <div className={styles.timerSection}>
            <div className={styles.timeDisplay}>{formatTime(time)}</div>

            <div className={styles.buttonRow}>
              <button className={styles.trackButton} onClick={handleStartStop}>
                {isRunning ? "Stop" : "Start"}
              </button>
              <button
                className={styles.trackButton}
                onClick={handleEnd}
                disabled={!sessionStarted || sessionEnded}
              >
                End
              </button>
            </div>
            {/* show the current past intervals in the session */}
            {intervals.length > 0 && (
              <div className={styles.pastIntervals}>
                <h5 className={styles.subheading}>Past Intervals</h5>
                <ul className={styles.intervalList}>
                  {intervals.map((interval, i) => {
                    const start = new Date(interval.start);
                    const end = new Date(interval.end);
                    const duration = Math.floor(
                      (end.getTime() - start.getTime()) / 1000
                    );

                    return (
                      <li key={i} className={styles.intervalItem}>
                        <span className={styles.intervalTime}>
                          {start.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          –{" "}
                          {end.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <span className={styles.intervalActivity}>
                          {interval.activity}
                        </span>
                        <span className={styles.intervalDuration}>
                          {formatTime(duration)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          <div className={styles.taskColumn}>
            <div className={styles.statLabel}>what’re you working on?</div>
            <div className={styles.scrollableBox}>
              {activities.map((item, i) => (
                <div
                  className={`${styles.trackTag} ${
                    selectedActivity === item ? styles.selected : ""
                  }`}
                  key={i}
                  onClick={() => setSelectedActivity(item)}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className={styles.saveButtonWrapper}>
              <button
                className={styles.trackButton}
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
