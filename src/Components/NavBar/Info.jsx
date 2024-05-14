import {TiInfoLarge} from "react-icons/ti";
import {Tooltip} from "react-tooltip";
import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function Info(){

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return(
    <>

      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>👋 ¡Bienvenido a Organiza Tu Horario!</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {/*Introducción*/}

          <section>
            <p>
              Esta aplicación fue creada para facilitar la organización de grupos de estudio, Los grupos de estudio son las clases que se desean organizar, por ejemplo, <b>Programación</b> o <b>Matemáticas</b>.
            </p>
            <p>
              Los grupos de estudio contienen opciones para elegir el horario de la clase en la semana, con diferentes profesores, salas y horarios semanales, la finalidad de está aplicación es generar múltiples opciones de horarios basadas en esas mismas opciones para que los estudiantes puedan elegir el que más les convenga.
            </p>

          </section>

          {/* Como acceder? */}

          <section>
            <h4
              className='text-center'
              style={{
                marginTop: '1rem',
                marginBottom: '1rem',
              }}
            >¿Cómo acceder?</h4>
            <p>
              Para acceder a la aplicación, solo es necesario ingresar a la página principal:
            </p>
            <a className='d-flex justify-content-center' href="https://santihsilva.github.io/OrganizaTuHorario/">https://santihsilva.github.io/OrganizaTuHorario/</a>
          </section>

          {/* Intefaz de Usuario */}

          <section>
            <h4
              className='text-center'
              style={{
                marginTop: '1rem',
                marginBottom: '1rem',
              }}
            >Interfaz de Usuario</h4>
            <p>
              La interfaz de usuario es muy sencilla, en la parte superior se encuentra la barra de navegación, en la cual se puede cambiar el tema de la aplicación y acceder a la información de la aplicación.
            </p>
            <img src="https://raw.githubusercontent.com/SantiHSilva/OrganizaTuHorario/gh-pages/info1.png" alt="Barra de navegación" className='img-fluid p-2'/>
            <p>
              Dentro de la página principal, existen 2 secciones, la sección de grupos y la sección de horarios.
            </p>
            <img src="https://raw.githubusercontent.com/SantiHSilva/OrganizaTuHorario/gh-pages/info2.png" alt="Secciones de la página" className='img-fluid p-2'/>

            {/* Sección de grupos */}

            <h5 className='text-center'>Sección de grupos</h5>
            <p>
              En la sección de grupos se encuentran todos los grupos de estudio que se han creado, en esta sección se pueden crear nuevos grupos, editar los grupos existentes y eliminarlos.
            </p>
            <img src="https://raw.githubusercontent.com/SantiHSilva/OrganizaTuHorario/gh-pages/info3.png" alt="Sección de grupos" className='img-fluid p-2'/>
            <p>

            </p>

            {/* Sección de horarios */}

            <h5 className='text-center'>Sección de horarios</h5>

            <p>
              En esta sección se encuentran todos los horarios que se han generado, en esta sección puedes desplazarte entre los horarios generados, cambiar el formato de horas y descargar los formatos individualmente o grupalmente en diferentes formatos.
            </p>

            <img src="https://raw.githubusercontent.com/SantiHSilva/OrganizaTuHorario/gh-pages/info4.png" alt="Opciones de horarios" className='img-fluid p-2'/>

          </section>

          {/* Formato de creación de grupo */}

          <section>
            <h4
              className='text-center'
              style={{
                marginTop: '1rem',
                marginBottom: '1rem',
              }}
            >Creación de grupos</h4>
            <p>
              Para crear un grupo, solo es necesario ingresar el nombre del grupo y asignarle un color, el color es para identificar el grupo en la sección de horarios.
            </p>
            <img src="https://raw.githubusercontent.com/SantiHSilva/OrganizaTuHorario/gh-pages/info5.png" alt="Formato de creación de grupo" className='img-fluid p-2'/>

            <h5
              className='text-center'
              style={{
                marginTop: '1rem',
                marginBottom: '1rem',
              }}
            >
              Configuración de grupos
            </h5>
            <p>
              Para configurar un grupo, solo es necesario ingresar a la sección de grupos y hacer click en el botón de configuración.
            </p>
            <img src="https://raw.githubusercontent.com/SantiHSilva/OrganizaTuHorario/gh-pages/info6.png" alt="Botón de configuración de grupos" className='img-fluid p-2'/>
            <p>
              Dentro de la interfaz, podemos ver las opciones de configuración de grupos, en la parte superior se encuentra el nombre del grupo y el color, en la parte inferior se encuentran las opciones de configuración de las materias.
            </p>
            <img src="https://raw.githubusercontent.com/SantiHSilva/OrganizaTuHorario/gh-pages/info7.png" alt="Opciones de configuración de grupos" className='img-fluid p-2'/>
            <p>
              Al crear una nueva materia, podemos añadirle apuntes generales, como el nombre del profesor, el código de la materia, donde cada unas de estas opciones se puede elegir si se desea mostrar o no en el horario.
            </p>
            <img src="https://raw.githubusercontent.com/SantiHSilva/OrganizaTuHorario/gh-pages/info8.png" alt="Apuntes generales" className='img-fluid p-2'/>
            <p>
              A su vez, podemos incluir las descripciones por día, aqui es donde va individualmente las sesiones a la semana, por ejemplo, si la materia se da los lunes, miércoles y viernes, se deben crear 3 descripciones por día, una para cada día.
            </p>
            <b>
              Es importante mencionar que si por ejemplo tienes una clase de 4pm a 6pm, lo ideal es poner en la hora inicio 4:00pm y en la hora final 5:59pm, siendo un minuto antes de la hora de salida, esto es para evitar cruces de tiempo entre las sesiones.
            </b>
            <img src="https://raw.githubusercontent.com/SantiHSilva/OrganizaTuHorario/gh-pages/info9.png" alt="Descripciones por día" className='img-fluid p-2'/>
            <p>
              Por último, podemos incluir ajustes por día, estos ajustes son para agregar información extra a las sesiones, por ejemplo, el lugar donde se da la clase, con la opción de mostrar o no mostrar en el horario.
            </p>
            <img src="https://raw.githubusercontent.com/SantiHSilva/OrganizaTuHorario/gh-pages/info10.png" alt="Ajustes por día" className='img-fluid p-2'/>
          </section>


          {/* Contacto */}

          <section>
            <h4
              className='text-center'
              style={{
                marginTop: '1rem',
                marginBottom: '1rem',
              }}
            >Contacto</h4>
            <p>
              La aplicación se encuentra en desarrollo, por lo que puede contener errores o no funcionar correctamente, si hay algún problema, por favor, reportalo en mi perfil de Discord: <b>fsantiago</b>
            </p>
            <img src="https://raw.githubusercontent.com/SantiHSilva/OrganizaTuHorario/gh-pages/info11.png" alt="Contacto de la aplicación" className='img-fluid'/>
          </section>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <TiInfoLarge size={30} onClick={handleOpen} className='OTHNavBarIcon icon-link m-2' data-tooltip-id="information"/>
      <Tooltip
        id="information"
        noArrow
        place={'top'}
        border={'1px solid #ffffff'}
        style={{
          userSelect: 'none',
          borderRadius: '20px',
          zIndex: 1000,
        }} // No seleccionar el texto del tooltip
      >
        Información de la aplicación
      </Tooltip>
    </>
  )
}