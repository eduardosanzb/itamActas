ITAM-Actas
===================
ITAM-Actas es un sistema BPM para la asignacion y validacion de calificaciones de los diferentes grupos existentes en un periodo escolar. El sistema
esta dividido en los siguientes proyecctos:

* ItamActasApp
* ItamActasBPM

## ItamActasApp
Proyecto Maven para la generacion de librerias utilizadas por el sistema. El proyecto cuenta con los siguientes modulos:

* ItamActasActiviti
* ItamActasServices

### ItamActasActiviti
Proyecto Java para la generacion de Listener, Renderer y demas librerias utilizadas por el proceso BPMN

### ItamActasServices
Proyecto Java para la generacion de de servicios utilizados en el sistema


## ItamActasBPM
Proyecto BPMN que define el proceso a seguir para cada una de las actas activadas

## Compilar sistema

* ubicarse en ITAM-Actas\ItamActasApp
* Ejecutar: mvn clean install

## Instalacion de librerias

* copiar ITAM-Actas\ItamActasApp\ItamActasActiviti\target\ItamActasActiviti-1.0-SNAPSHOT.jar a [apache-tomcat]\webapps\activiti-explorer\WEB-INF\lib
* COPIAR ITAM-Actas\ItamActasApp\ItamActasServices\target\ItamActasServices-1.0-SNAPSHOT.jar a [apache-tomcat]\webapps\activiti-explorer\WEB-INF\lib

## Instalacion de BPMN

* Entrar a http://<<ip>>:<<puerto>>/activiti-explorer/ con un usuario administrador
* Seleccionar la opcion Gestionar -> Despliegues -> Cargar nueva
* Seleccionar la opcion de 'Elegir un archivo'
* Seleccionar el archivo ITAM-Actas\ItamActasBPM\deployment\ItamActasProcess.bar
