import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cfpawqoegitgtsjygbqp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcGF3cW9lZ2l0Z3RzanlnYnFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1OTkwNTEsImV4cCI6MjA3NTE3NTA1MX0.Ry3ufMVvFCaMafRrJpUkSafUuP-RnlSXAZ1z0wGdZNo'
);

async function activateTestUsers() {
  try {
    console.log('🔧 Activando catadores para pruebas...\n');
    
    // Activar los primeros 5 catadores para poder probar
    const testEmails = [
      'mesa1a@gmail.com',  // RITA PINTO - Tablet 25
      'mesa1b@gmail.com',  // ADELA VIZCAY - Tablet 3 
      'mesa2a@gmail.com',  // JOÃO PALMA - Tablet 9
      'mesa3a@gmail.com',  // JOSE FIGUEIREDO - Tablet 12
      'mesa4a@gmail.com'   // VASCO FERNANDES - Tablet 20
    ];
    
    for (const email of testEmails) {
      const { data, error } = await supabase
        .from('catadores')
        .update({ 
          rol: 'admin' // Activamos algunos como admin para pruebas
        })
        .eq('email', email)
        .select();
      
      if (error) {
        console.error(`❌ Error activando ${email}:`, error.message);
      } else {
        console.log(`✅ Activado: ${email} (Tablet: ${data[0]?.ntablet})`);
      }
    }
    
    console.log('\n🎉 Catadores de prueba activados!');
    console.log('📱 Puedes probar el login con cualquiera de estos emails.');
    
  } catch (err) {
    console.error('💥 Error:', err.message);
  }
}

activateTestUsers();