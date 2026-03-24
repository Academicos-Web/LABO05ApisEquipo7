

/**
 * PASO 1: DATOS PRIMITIVOS (Configuración base)
 * Definimos valores básicos con tipado explícito para que el compilador sepa 
 * exactamente qué tipo de datos estamos manejando desde el inicio.
 */
// Declaramos la URL base como string para no escribirla muchas veces.
const API_URL: string = "https://jsonplaceholder.typicode.com"; 

// El ID que usaremos para las pruebas. Especificamos que es un número.
const POST_ID_TO_SEARCH: number = 1; 

// Un booleano para decidir si mostramos mensajes de log detallados.
const IS_DEBUG_MODE: boolean = true; 

/**
 * PASO 2: INTERFACES (El contrato de datos)
 * Creamos una interfaz 'Post'. Esto no genera código JS, es una guía para TS
 * que define la estructura exacta que esperamos recibir de la API.
 */
interface Post {
  userId: number;   // ID del autor (numérico)
  id: number;       // ID único del post (numérico)
  title: string;    // Título del post (texto)
  body: string;     // Contenido del post (texto)
}

/**
 * PASO 3: FUNCIÓN PARA OBTENER DATOS (GET)
 * Usamos 'async' para indicar que la función maneja procesos de llamadas a APIS.
 * 'Promise<void>' indica que la función no retorna un valor, sino una promesa vacía.
 */
const fetchSinglePost = async (id: number): Promise<void> => {
  // Aplicamos un estilo visual a la consola si estamos en modo debug.
  if (IS_DEBUG_MODE) {
    console.log(`%c [LAB 1] Buscando post con ID: ${id}...`, "color: cyan; font-weight: bold;");
  }

  try {
    // 'fetch' realiza la petición HTTP. 'await' espera a que se complete.
    // Usamos backticks (``) para concatenar la URL y el ID de forma dinámica.
    const response = await fetch(`${API_URL}/posts/${id}`);

    // Verificamos si la respuesta es exitosa (status 200-299).
    if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
    }

    // Convertimos el cuerpo de la respuesta a JSON.
    // Le decimos a TS que el resultado es de tipo 'Post'.
    const data: Post = await response.json();

    // Imprimimos el resultado accediendo a las propiedades definidas en la interfaz.
    console.log("✅ Post recuperado:");
    console.log(`   - Título: ${data.title}`);
    console.log(`   - Cuerpo: ${data.body.substring(0, 50)}...`);
    
  } catch (error) {
    // Si algo falla (red, error de servidor, etc.), el error cae aquí.
    console.error("❌ Fallo en Lab 1:", error);
  }
};

/**
 * PASO 4: FUNCIÓN PARA CREAR DATOS (POST)
 * Aquí aprendemos a enviar un objeto JS al servidor.
 */
const createNewPost = async (): Promise<void> => {
  console.log("%c [LAB 2] Creando un nuevo recurso...", "color: orange; font-weight: bold;");

  // Definimos un objeto literal que sigue la lógica de nuestra interfaz.
  const myNewPost = {
    title: "Mi Post de Prueba",
    body: "Contenido generado desde el laboratorio de TypeScript.",
    userId: 10
  };

  try {
    // En el fetch, pasamos un objeto de configuración como segundo parámetro.
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST", // Especificamos que vamos a "enviar/crear".
      
      // El servidor requiere una cadena de texto, no un objeto JS.
      // 'JSON.stringify' hace esa conversión.
      body: JSON.stringify(myNewPost), 
      
      headers: {
        // Metadata: Informamos al servidor que el contenido es JSON con codificación UTF-8.
        "Content-type": "application/json; charset=UTF-8", 
      },
    });

    // La API responde con el objeto creado y un nuevo ID (usualmente el 101).
    const createdPost: Post = await response.json();
    
    console.log("✅ Recurso creado exitosamente en el servidor:");
    console.log(createdPost);

  } catch (error) {
    console.error("❌ Fallo en Lab 2:", error);
  }
};
/*
        ##################################################
        EL RETO 
        ##################################################
*/

/**
 * PASO 6: RETO DE RECURSOS ANIDADOS (Pistas y estructura)
 * Objetivo: Obtener los comentarios que pertenecen a un Post específico.
 */
// PISTA A: Crea la interfaz 'Comment'. 
// Recuerda que la API devuelve: postId, id, name, email y body.

/**
 * PASO 7: FUNCIÓN DE BÚSQUEDA DE COMENTARIOS
 * Instrucciones:
 * 1. Usa la URL: ${API_URL}/posts/${id}/comments
 * 2. Recuerda que la respuesta es una LISTA (Array) de objetos Comment.
 * 3. Usa un bucle o método de array (como .forEach) para mostrar los datos.
 */
/**
 * RETO DE LABORATORIO: Obtener recursos anidados (Comments)
 * * Instrucciones para el estudiante:
 * Sigue los pasos numerados para completar la función.
 */
interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const fetchCommentsByPost = async (postId: number): Promise<void> => {
  
  // 1. [LOG]: Imprime en consola un mensaje avisando que vas a buscar 
  // los comentarios del 'postId' recibido. Usa estilos %c si quieres.
  console.log(`%c [LAB 3] Buscando comentarios del post ${postId}...`, "color: purple; font-weight: bold;");

  try {
    // 2. [PETICIÓN]: Crea una constante 'response'.
    // Usa 'fetch' con backticks para unir API_URL + /posts/ + postId + /comments.
    const response = await fetch(`${API_URL}/posts/${postId}/comments`);

    // 3. [VALIDACIÓN]: Si la respuesta (response.ok) es falsa, 
    // lanza un error (throw new Error) indicando que falló la carga.
    if (!response.ok) {
      throw new Error("Error al cargar los comentarios");
    }

    // 4. [TRADUCCIÓN]: Crea una constante 'data'.
    // Usa 'await response.json()' y asígnale el tipo 'Comment[]' (Array de comentarios).
    const data: Comment[] = await response.json();

    // 5. [PROCESAMIENTO]: Una vez tengas los datos, imprime cuántos comentarios llegaron.
    // Tip: Usa data.length.
    console.log(`✅ Total de comentarios: ${data.length}`);


    // 6. [RECORRIDO]: Usa un método de array (como .forEach) para recorrer la lista.
    // Dentro, imprime solo el 'email' de cada comentario para verificar el tipado.
    data.forEach((comment) => {
      console.log(`📧 ${comment.email}`);
    });

  } catch (error) {
    // 7. [ERRORES]: Captura el error y muéstralo con console.error.
    console.error("❌ Fallo en Lab 3:", error);
  }
};


/**
 * PISTA FINAL DE EJECUCIÓN:
 * Dentro de tu función 'runLaboratory', no olvides añadir:
 * await fetchCommentsByPost(POST_ID_TO_SEARCH);
 */

/*
    ################################################################################
    
    Supabase challenge (MODIFICADO PARA MI BASE DE DATOS)

    #################################################################################
*/

import { createClient } from '@supabase/supabase-js';

/**
 * PASO 1: CONFIGURACIÓN DE CONEXIÓN
 */
const SUPABASE_URL: string = "https://btxachhlndyiecbetuvx.supabase.co";
const SUPABASE_KEY: string = "sb_publishable_nbxL983kM26QpZBCNk2Aag_Ge8oAVFR";

/**
 * PASO 2: INICIALIZACIÓN DEL CLIENTE
 */
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * ##################################################
 * 🔹 REFERENCIA ORIGINAL (AUTOS) - NO MODIFICAR
 * ##################################################
 */

interface Auto {
  id_auto: number;
  patente: string;
  id_propietario: number;
}

const getAutos = async (): Promise<void> => {

  console.log("%c [SUPABASE] Obteniendo autos...", "color: cyan; font-weight: bold;");

  const { data, error } = await supabase
    .from('autos')
    .select('*');

  if (error) {
    console.error("❌ Error al obtener autos:", error.message);
    return;
  }

  const autos: Auto[] = data as Auto[];

  console.log("✅ Autos:");
  console.table(autos);
};

/**
 * ##################################################
 * 🔥 TU IMPLEMENTACIÓN (DOCENTES - PRO)
 * ##################################################
 */

interface DocenteCompleto {
  id_docente: number;
  grado_academico: string;
  usuario: {
    nombre: string;
    correo_institucional: string;
  }[];

  carrera: {
    nombre_carrera: string;
  }[];

  docente_materia: {
    periodo_academico: string;
    materia: {
      nombre_materia: string;
    }[];
  }[];
}

/**
 * 🔥 FUNCIÓN PERSONALIZADA (JOIN DE VARIAS TABLAS)
 */
const getDocentesFullData = async (): Promise<void> => {

  console.log("%c [SUPABASE] Obteniendo docentes COMPLETOS...", "color: green; font-weight: bold;");

  const { data, error } = await supabase
    .from('docente')
    .select(`
      id_docente,
      grado_academico,
      usuario (
        nombre,
        correo_institucional
      ),
      carrera (
        nombre_carrera
      ),
      docente_materia (
        periodo_academico,
        materia (
          nombre_materia
        )
      )
    `);

  if (error) {
    console.error("❌ Error en Supabase:", error.message);
    return;
  }

  const docentes: DocenteCompleto[] = data;

  console.log("✅ Docentes con toda su información:");

  docentes.forEach((docente) => {
    console.log(`\n👨‍🏫 ${docente.usuario[0]?.nombre}`);
    console.log(`📧 ${docente.usuario[0]?.correo_institucional}`);
    console.log(`🎓 ${docente.grado_academico}`);
    console.log(`🏫 ${docente.carrera[0]?.nombre_carrera}`);

    docente.docente_materia.forEach((dm) => {
      console.log(`📚 ${dm.materia[0]?.nombre_materia} (${dm.periodo_academico})`);
    });
  });
};

/**
 * ##################################################
 * 🚀 EJECUCIÓN
 * ##################################################
 */
const runLaboratory = async () => {
  console.log("%c --- INICIO DEL EXPERIMENTO ---", "background: #222; color: #bada55; padding: 5px;");
  
  // 🔹 LABS ORIGINALES
  await fetchSinglePost(POST_ID_TO_SEARCH); 
  await createNewPost(); 
  await getAutos();   
  await fetchCommentsByPost(POST_ID_TO_SEARCH);

  // 🔥 SUPABASE (RETO FINAL)
  await getDocentesFullData();              
  
  console.log("%c --- EXPERIMENTO FINALIZADO ---", "background: #222; color: #bada55; padding: 5px;");
};

// Ejecutar todo
runLaboratory();