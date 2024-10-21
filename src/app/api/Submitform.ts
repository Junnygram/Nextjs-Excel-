import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import formSchema from '@/components/Form';
import { parse } from 'json2csv';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const validatedData = formSchema.parse(req.body);
      const csvData = parse(validatedData, { header: false });
      const cleanedCsvData = csvData.replace(/"/g, '');

      const auth = new google.auth.GoogleAuth({
        credentials: {
          type: 'service_account',
          project_id: process.env.GOOGLE_PROJECT_ID,
          private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
          private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          client_id: process.env.GOOGLE_CLIENT_ID,
          auth_uri: process.env.GOOGLE_AUTH_URI,
          token_uri: process.env.GOOGLE_TOKEN_URI,
          auth_provider_x509_cert_url:
            process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
          client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({ version: 'v4', auth });

      const spreadsheetId = process.env.SPREADSHEET_ID;
      const range = 'Sheet1!A1';

      const valueInputOption = 'USER_ENTERED';

      const valueRangeBody = {
        values: [cleanedCsvData.split(',')],
      };

      await sheets.spreadsheets.values.append({
        spreadsheetId: spreadsheetId,
        range: range,
        valueInputOption: valueInputOption,
        requestBody: valueRangeBody,
      });

      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
