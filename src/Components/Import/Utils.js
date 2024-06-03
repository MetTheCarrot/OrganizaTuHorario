    // Comprimir las palabras claves:
    // key = a
    // name = b
    // color = c
    // materias = d
    // descripciones_generales = e
    // descripciones_por_dia = f
    // mostrar_en_tabla = g
    // titulo = h
    // dia = i
    // inicio = j
    // fin = k
    // ajustes = l

    // ejemplo:
    // {
    //   "key": 5,
    //   "name": "Infraestructura TIC",
    //   "color": "#f9f348",
    //   "materias": [
    //     {
    //       "descripciones_generales": [
    //         {
    //           "mostrar_en_tabla": true,
    //           "titulo": "NRC: 11317"
    //         }
    //       ],
    //       "descripciones_por_dia": [
    //         {
    //           "dia": "4",
    //           "inicio": "17:00",
    //           "fin": "19:59",
    //           "ajustes": [
    //             {
    //               "mostrar_en_tabla": true,
    //               "titulo": "ASAM 201"
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // }

    // Se comprime a:
    // {
    //   "a": 5,
    //   "b": "Infraestructura TIC",
    //   "c": "#f9f348",
    //   "d": [
    //     {
    //       "e": [
    //         {
    //           "g": true,
    //           "h": "NRC: 11317"
    //         }
    //       ],
    //       "f": [
    //         {
    //           "i": "4",
    //           "j": "17:00",
    //           "k": "19:59",
    //           "l": [
    //             {
    //               "g": true,
    //               "h": "ASAM 201"
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // }

const compressGroupList = (groupList) => {
  const compressedGroupList = groupList.map((group) => {
    const compressedGroup = {
      "a": group.key,
      "b": group.name,
      "c": group.color,
      "d": group.materias.map((materia) => {
        return {
          "e": materia.descripciones_generales.map((descripcionGeneral) => {
            return {
              "f": descripcionGeneral.mostrar_en_tabla,
              "g": descripcionGeneral.titulo
            }
          }),
          "h": materia.descripciones_por_dia.map((descripcionPorDia) => {
            return {
              "i": descripcionPorDia.dia,
              "j": descripcionPorDia.inicio,
              "k": descripcionPorDia.fin,
              "l": descripcionPorDia.ajustes.map((ajuste) => {
                return {
                  "g": ajuste.mostrar_en_tabla,
                  "h": ajuste.titulo
                }
              })
            }
          })
        }
      })
    }
    return compressedGroup;
  });
  return compressedGroupList;
} 

const unCompressGroupList = (compressedGroupList) => {
  // Verificar si tiene la estructura ya descomprimida
  if (compressedGroupList[0].key !== undefined) {
    return compressedGroupList;
  }

  const groupList = compressedGroupList.map((compressedGroup) => {
    return {
      "key": compressedGroup.a,
      "name": compressedGroup.b,
      "color": compressedGroup.c,
      "materias": compressedGroup.d.map((compressedMateria) => {
        return {
          "descripciones_generales": compressedMateria.e.map((compressedDescripcionGeneral) => {
            return {
              "mostrar_en_tabla": compressedDescripcionGeneral.f,
              "titulo": compressedDescripcionGeneral.g
            }
          }),
          "descripciones_por_dia": compressedMateria.h.map((compressedDescripcionPorDia) => {
            return {
              "dia": compressedDescripcionPorDia.i,
              "inicio": compressedDescripcionPorDia.j,
              "fin": compressedDescripcionPorDia.k,
              "ajustes": compressedDescripcionPorDia.l.map((compressedAjuste) => {
                return {
                  "mostrar_en_tabla": compressedAjuste.g,
                  "titulo": compressedAjuste.h
                }
              })
            }
          })
        }
      })
    }});
  
  return groupList;
}

export { compressGroupList, unCompressGroupList }