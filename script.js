import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://dsugctfsikpmfuyynjpg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzdWdjdGZzaWtwbWZ1eXluanBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDQwMDMsImV4cCI6MjA3ODYyMDAwM30.0V7P2C5mIq7JXN_iJtuy6ocgAtJ0zB3qtrOnBoo4kYo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testarConexao() {
  try {
    const { data, error } = await supabase.from('livros').select('*').limit(1);

    if (error) throw error;

    console.log('Conexão bem-sucedida!');
    console.log('Exemplo de dado retornado:', data);
  } catch (err) {
    console.error('Erro ao conectar com o Supabase:', err.message);
  }
}

testarConexao();