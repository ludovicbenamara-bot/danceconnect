import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTeacherStructure() {
    const { data: teachers, error } = await supabase.from('teachers').select('*').limit(1);
    if (error) {
        console.error('Error:', error);
        return;
    }
    console.log('Teacher record structure:', teachers[0]);
}

checkTeacherStructure();
