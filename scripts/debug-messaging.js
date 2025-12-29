import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function debugMessaging() {
    console.log('--- Chats ---');
    const { data: chats, error: cErr } = await supabase.from('chats').select('*');
    if (cErr) console.error('Error fetching chats:', cErr);
    else console.table(chats);

    console.log('\n--- Messages ---');
    const { data: messages, error: mErr } = await supabase.from('messages').select('*');
    if (mErr) console.error('Error fetching messages:', mErr);
    else console.table(messages);
}

debugMessaging();
