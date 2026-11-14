# Connect the website forms to Google Sheets

This takes about 10 minutes and you do it once. When you're done, every form on the site saves into one Google Sheet:

| Tab | Form |
| --- | --- |
| Contact & Prayer | Contact page |
| IMMERSION Registration | Registration form on the IMMERSION page |
| Dear Atheist Questions | Question box on the Articles page |

Each new entry also emails an alert to **message.theezraanya@gmail.com**, and the person who filled the form gets a thank-you email when they give an email address.

> Use the Google account you want the thank-you emails to come **from** (for example mail.photizoglobal@gmail.com). Google sends them from the account that owns the script.

## 1. Create the sheet

1. Sign in to Google with the ministry account and go to **sheets.new**.
2. Name the sheet `Photizo Website Forms`.

## 2. Add the script

1. In the sheet, open **Extensions → Apps Script**.
2. Delete everything in `Code.gs`, then paste in the whole of `Code.gs` from this folder.
3. Click **Save** (the disk icon). Name the project `Photizo Forms`.

## 3. Create the tabs and allow email

1. In the toolbar, pick **setup** from the function list and click **Run**.
2. Google asks for permission. Click **Review permissions**, choose the account, then **Advanced → Go to Photizo Forms (unsafe) → Allow**. The "unsafe" warning appears for every personal script that Google hasn't reviewed. You wrote this one, so it's safe to allow.
3. Go back to the sheet. The three tabs are there with their headings.

## 4. Publish it as a web app

1. In Apps Script, click **Deploy → New deployment**.
2. Click the gear next to "Select type" and choose **Web app**.
3. Set:
   - **Description:** `Website forms`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
4. Click **Deploy** and copy the **Web app URL**. It ends in `/exec`.

## 5. Paste the URL into the website

1. In VS Code, open `lib/site.ts`.
2. Find `formsEndpoint` and paste the URL between the quotes:
   ```ts
   formsEndpoint: process.env.NEXT_PUBLIC_FORMS_ENDPOINT || "https://script.google.com/macros/s/XXXX/exec",
   ```
3. Save, then push:
   ```bash
   git add .
   git commit -m "Connect forms to Google Sheets"
   git push
   ```

## 6. Test it

Once the site updates, send a test message from the Contact page. Within a few seconds it should appear in the sheet, the alert should reach message.theezraanya@gmail.com, and the thank-you should reach the address you typed.

## Good to know

- **Until the URL is pasted in**, the forms still work: they open the visitor's email app with the message filled in and addressed to mail.photizoglobal@gmail.com.
- **Changing the script later:** after editing `Code.gs`, use **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**. The URL stays the same, so the website needs no change.
- **Changing who gets alerts:** edit `ALERT_EMAIL` at the top of `Code.gs`, then redeploy as above.
- **Email limits:** a free Gmail account can send about 100 emails a day from scripts. Each entry uses up to two (the alert and the thank-you), so that covers about 50 entries a day. A Google Workspace account allows far more.
- **Spam:** each form has a hidden field that people never see. Bots fill it in, and the script quietly drops those entries.
