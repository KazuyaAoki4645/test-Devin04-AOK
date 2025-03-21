import { AUTH_CONFIG } from '@/config';
import { getUserCredentials } from '@/utils/session';

/**
 * Utility function to retrieve an authentication token from the API
 * @param {string} apiUrl - Optional override for API URL (defaults to config)
 * @param {string} username - Optional override for username (defaults to config)
 * @param {string} password - Optional override for password (defaults to config)
 * @returns {Promise<{access_token: string}>} - The token data including access_token
 */
export async function getAuthToken(
  apiUrl?: string,
  username?: string,
  password?: string
): Promise<{ access_token: string }> {
  try {
    // Use config API URL by default
    const url = apiUrl || AUTH_CONFIG.apiUrl;
    
    // In production, try to get credentials from user session
    let credentialsObj: { username: string; password: string };
    if (AUTH_CONFIG.useUserCredentials) {
      const userCredentials = getUserCredentials();
      if (userCredentials) {
        credentialsObj = {
          username: userCredentials.username,
          password: userCredentials.password
        };
      } else {
        // Fallback to provided credentials if no user credentials available
        credentialsObj = {
          username: username || '',
          password: password || '',
        };
      }
    } else {
      // In development, use dev credentials from config
      credentialsObj = {
        username: username || AUTH_CONFIG.devCredentials.username,
        password: password || AUTH_CONFIG.devCredentials.password,
      };
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(credentialsObj),
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to retrieve authentication token:", error);
    throw error;
  }
}
