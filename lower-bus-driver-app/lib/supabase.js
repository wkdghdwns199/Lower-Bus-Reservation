import 'react-native-url-polyfill/auto'
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
const url = 'https://fzkcwogvnbvahqddtynh.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6a2N3b2d2bmJ2YWhxZGR0eW5oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDI5OTU0OSwiZXhwIjoyMDE1ODc1NTQ5fQ.uE40iXKqJByQxDpM2FFktvGmkWyWY6NbQuGc-NIYnH8'
export const supabase = createClient(url, key, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})
