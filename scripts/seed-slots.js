import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedSlots() {
    const today = new Date();
    const slots = [];

    // Generate slots for the next 7 days for 3 teachers
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];

        // Teacher 1: 14:00, 16:00
        slots.push({ teacher_id: 1, date: dateStr, time: '14:00', status: 'available' });
        slots.push({ teacher_id: 1, date: dateStr, time: '16:00', status: 'available' });

        // Teacher 2: 18:00
        slots.push({ teacher_id: 2, date: dateStr, time: '18:00', status: 'available' });

        // Teacher 3: 10:00, 19:00
        slots.push({ teacher_id: 3, date: dateStr, time: '10:00', status: 'available' });
        slots.push({ teacher_id: 3, date: dateStr, time: '19:00', status: 'available' });
    }

    const { error } = await supabase.from('slots').insert(slots);
    if (error) console.error('Error seeding slots:', error);
    else console.log(`Successfully added ${slots.length} slots!`);
}

seedSlots();
