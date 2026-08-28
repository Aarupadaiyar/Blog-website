import { google } from "googleapis";

/**
 * Optional integration: appends each new comment (name/email/comment/post/date)
 * as a row in a Google Sheet, so emails collected from comments land somewhere
 * you can use them (a mailing list, a CRM import, etc). Leave the env vars
 * unset and this silently no-ops — comments still save normally either way.
 * See SETUP.md for how to create the service account and share a sheet with it.
 */
const useSheets = Boolean(
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID
);

export async function appendCommentToSheet(row: {
  name: string;
  email: string;
  comment: string;
  postTitle: string;
  createdAt: Date;
}) {
  if (!useSheets) return;

  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const tab = process.env.GOOGLE_SHEET_NAME || "Sheet1";

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${tab}!A:E`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[row.name, row.email, row.comment, row.postTitle, row.createdAt.toISOString()]],
      },
    });
  } catch (err) {
    // Never let a Sheets outage block a comment from saving.
    console.error("Google Sheets sync failed:", err);
  }
}
