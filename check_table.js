import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cfpawqoegitgtsjygbqp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcGF3cW9lZ2l0Z3RzanlnYnFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1OTkwNTEsImV4cCI6MjA3NTE3NTA1MX0.Ry3ufMVvFCaMafRrJpUkSafUuP-RnlSXAZ1z0wGdZNo'
);

async function checkTable() {
  try {
    console.log('🔍 Revisando tabla catadores...\n');
    
    // Obtener todos los catadores
    const { data, error } = await supabase
      .from('catadores')
      .select('*');
    
    if (error) {
      console.error('❌ Error:', error.message);
      return;
    }
    
    console.log('✅ Tabla catadores encontrada!');
    console.log('📊 Total de registros:', data.length);
    console.log('\n📋 Catadores existentes:');
    console.log('='.repeat(50));
    
    data.forEach((catador, index) => {
      console.log(`${index + 1}. Email: ${catador.email}`);
      console.log(`   Nombre: ${catador.nombre || 'No definido'} ${catador.apellidos || ''}`);
      console.log(`   Tablet: ${catador.ntablet ? (typeof catador.ntablet === 'string' ? catador.ntablet.substring(0, 20) + '...' : catador.ntablet) : 'Sin asignar'}`);
      console.log(`   Activo: ${catador.activo ? '✅' : '❌'}`);
      console.log('   ---');
    });
    
    // Verificar campos necesarios
    const firstRecord = data[0];
    if (firstRecord) {
      console.log('\n🔧 Estructura de campos:');
      Object.keys(firstRecord).forEach(field => {
        console.log(`   - ${field}: ${typeof firstRecord[field]}`);
      });
      
      // Verificar campos críticos para nuestro sistema
      const requiredFields = ['email', 'ntablet'];
      const missingFields = requiredFields.filter(field => !(field in firstRecord));
      
      if (missingFields.length > 0) {
        console.log('\n⚠️  Campos faltantes para el sistema de tablets:');
        missingFields.forEach(field => console.log(`   - ${field}`));
      } else {
        console.log('\n✅ Todos los campos necesarios están presentes!');
      }
    }
    
  } catch (err) {
    console.error('💥 Error de conexión:', err.message);
  }
}

checkTable();