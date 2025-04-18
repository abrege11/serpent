const { get_pool_connection } = require('../connection');
const { v4: uuidv4 } = require('uuid');

const upsertGithubProfile = async function (profile) {
    let connection;
    try {
        connection = await get_pool_connection();
        const query = `
            INSERT INTO github_profiles (profile_id, github_id, user_id, username, name, url, bio, num_repos, followers, following, account_created)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            username = VALUES(username),
            name = VALUES(name),
            url = VALUES(url),
            bio = VALUES(bio),
            num_repos = VALUES(num_repos),
            followers = VALUES(followers),
            following = VALUES(following),
            account_created = VALUES(account_created);
        `;
        const values = [
            profile.profile_id || uuidv4(),
            profile.github_id,
            profile.user_id,
            profile.username,
            profile.name || null,
            profile.url || null,
            profile.bio || null,
            profile.num_repos || 0,
            profile.followers || 0,
            profile.following || 0,
            profile.account_created || null
        ];
        await connection.query(query, values);
        console.log('GitHub profile upserted successfully');

        return new Response(JSON.stringify({ message: 'Github profile upserted successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error upserting GitHub profile:', error.message);
        return new Response(JSON.stringify({ message: 'issue upserting Github profile' }), { status: 400 });
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const upsertGithubRepo = async function (repo) {
    let connection;
    try {
        connection = await get_pool_connection();
        const query = `
            INSERT INTO github_repos (repo_id, profile_id, name, url)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            profile_id = VALUES(profile_id),
            url = VALUES(url);
        `;
        const values = [
            repo.repo_id || uuidv4(),
            repo.profile_id,
            repo.name,
            repo.url
        ];
        await connection.query(query, values);
        console.log('GitHub repository upserted successfully');

        return new Response(JSON.stringify({ message: 'Github repo upserted successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error upserting GitHub repository:', error.message);
        return new Response(JSON.stringify({ message: 'issue upserting Github repo' }), { status: 400 });
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const upsertGithubCommit = async function (commit) {
    let connection;
    try {
        connection = await get_pool_connection();
        const query = `
            INSERT INTO github_commits (commit_id, repo_id, sha, url, message, date, committer_username, committer_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            url = VALUES(url),
            message = VALUES(message),
            date = VALUES(date),
            committer_username = VALUES(committer_username),
            committer_id = VALUES(committer_id);
        `;
        const values = [
            commit.commit_id || uuidv4(),
            commit.repo_id,
            commit.sha,
            commit.url,
            commit.message || null,
            commit.date || null,
            commit.committer_username || null,
            commit.committer_id || null
        ];
        await connection.query(query, values);
        console.log('GitHub commit upserted successfully');
        return new Response(JSON.stringify({ message: 'Github commit upserted successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error upserting GitHub commit:', error.message);
        return new Response(JSON.stringify({ message: 'issue upserting Github commit' }), { status: 400 });
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const doesGithubProfileExist = async function (githubId) {
    let connection;
    try {
        connection = await get_pool_connection();
        const query = `SELECT github_id FROM github_profiles WHERE github_id = ? LIMIT 1`;
        const [rows] = await connection.query(query, [githubId]);

        return rows.length > 0 ? rows[0].github_id : null;
    } catch (error) {
        console.error('Error checking GitHub profile:', error.message);
        return null;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const getProfileIdFromUserId = async function (userId) {
    let connection;
    try {
        connection = await get_pool_connection();
        const query = `SELECT profile_id FROM github_profiles WHERE user_id = ? LIMIT 1`;
        const [rows] = await connection.query(query, [userId]);

        return rows.length > 0 ? rows[0].profile_id : null;
    } catch (error) {
        console.error('Error getting profile id', error.message);
        return null;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const getRepoIdFromName = async function (repoName) {
    let connection;
    try {
        connection = await get_pool_connection();
        const query = `SELECT repo_id FROM github_repos WHERE name = ? LIMIT 1`;
        const [rows] = await connection.query(query, [repoName]);

        return rows.length > 0 ? rows[0].repo_id : null;
    } catch (error) {
        console.error('Error getting repo id', error.message);
        return null;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const doesGithubRepoExist = async function (repoName) {
    let connection;
    try {
        connection = await get_pool_connection();
        const query = `SELECT repo_id FROM github_repos WHERE name = ? LIMIT 1`;
        const [rows] = await connection.query(query, [repoName]);

        return rows.length > 0 ? rows[0].name : null;
    } catch (error) {
        console.error('Error checking GitHub repo:', error.message);
        return null;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const doesGithubCommitExist = async function (commitSha) {
    let connection;
    try {
        connection = await get_pool_connection();
        const query = `SELECT commit_id FROM github_commits WHERE sha = ? LIMIT 1`;
        const [rows] = await connection.query(query, [commitSha]);

        return rows.length > 0 ? rows[0].commit_id : null;
    } catch (error) {
        console.error('Error checking GitHub commit:', error.message);
        return null;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const getUsersReposFromProfileId = async function (profileId) {
    let connection;
    try {
        connection = await get_pool_connection();
        const query = `SELECT repo_id FROM github_repos WHERE profile_id = ?`;
        const [rows] = await connection.query(query, [profileId]);

        return rows.map(row => row.repo_id);
    } catch (error) {
        console.error('Error fetching repos for profile_id:', error.message);
        return [];
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = {
    upsertGithubProfile,
    upsertGithubCommit,
    upsertGithubRepo,
    doesGithubCommitExist,
    doesGithubProfileExist,
    doesGithubRepoExist,
    getProfileIdFromUserId,
    getRepoIdFromName
}