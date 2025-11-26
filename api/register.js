// api/register.js   ← make sure the file name is exactly this (lowercase)

import { Buffer } from 'node:buffer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    try {
        // Properly read form-data from Vercel
        const buffers = [];
        for await (const chunk of req) {
            buffers.push(chunk);
        }
        const body = Buffer.concat(buffers).toString();

        // Parse the raw form-data manually
        const params = new URLSearchParams(body);
        const fullname = params.get('fullname');
        const email = params.get('email');
        const age = params.get('age');
        const phone = params.get('phone');
        const course = params.get('course');
        const password = params.get('password');

        // Log the data (you will see this in Vercel Logs)
        console.log('New Registration:', {
            fullname,
            email,
            age,
            phone,
            course,
            timestamp: new Date().toISOString()
        });

        // Success response
        res.status(200).send('Success');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Server Error');
    }
}

export const config = {
    api: {
        bodyParser: false,   // THIS IS VERY IMPORTANT
    },
};
