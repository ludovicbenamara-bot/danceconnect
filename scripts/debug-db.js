import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function debugData() {
    console.log('--- Teachers ---');
    const { data: teachers, error: tErr } = await supabase.from('teachers').select('*');
    if (tErr) console.error(tErr);
    else console.table(teachers.map(t => ({ id: t.id, name: t.name })));

    console.log('\n--- Slots ---');
    const { data: slots, error: sErr } = await supabase.from('slots').select('*');
    if (sErr) console.error(sErr);
    else console.table(slots.map(s => ({ id: s.id, teacher_id: s.teacher_id, date: s.date, time: s.time, status: s.status })));
}

debugData();
