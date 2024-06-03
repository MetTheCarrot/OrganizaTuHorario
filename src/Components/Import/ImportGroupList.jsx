import {useSearchParams} from "react-router-dom";
import {replaceGroupList} from "../../Data/groupManager.js";
import JSONCrush from "jsoncrush";
import {decompressFromEncodedURIComponent} from "lz-string";
import { unCompressGroupList } from "./Utils.js";

export default function ImportGroupList(){

  const [ params ] = useSearchParams();

  try{
    const searchGroup = params.get("groupList")
    const groupList = unCompressGroupList(JSON.parse((JSONCrush.uncrush(decompressFromEncodedURIComponent(searchGroup)))))
    console.log("Decodificada: ")
    console.log(groupList)

    replaceGroupList(groupList);
  } catch(e){
    alert("Error importing groups")
    console.log("Error: ")
    console.log(e)
    return;
  }

  window.location.href = getRedirectURL();



/*  console.log("Importing groupList: " + groupList)

  console.log("Decodificada: " + groupList)*/

  function getRedirectURL(){
    // Está función borra el enlace que se le pasa y lo convierte en el enlace de la página principal.
    // Por ejemplo: https://metthecarrot.github.io/OrganizaTuHorario/enlacequedeberiaborrarse
    // Se convierte en: https://metthecarrot.github.io/OrganizaTuHorario/
    const index = window.location.href.indexOf("OrganizaTuHorario");
    const url = window.location.href.substring(0, index + 17) + "/";
    /*console.log("Redirigiendo a: " + url)*/
    return url;
  }

  return(
    <>
      Hola querido usuario, estás importando una lista de grupos. Por favor, espera...
      Si no te redirecciona pulsa F5.

      o dirigete a <a href={getRedirectURL()}> {getRedirectURL()} </a>
    </>
  )
}