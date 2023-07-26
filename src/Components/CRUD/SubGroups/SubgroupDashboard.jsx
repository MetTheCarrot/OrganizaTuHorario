import Modal from "react-bootstrap/Modal";
import {Form, InputGroup, Pagination} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {getGroupById, modifyColorName, modifyGroupName, modifyMaterias} from "../../Data/groupManager.js";
import {adaptColorByHexColor, getValueById} from "../../../Utils/Utils.js";
import {HiFolderAdd} from "react-icons/hi";
import {TbTrashXFilled} from "react-icons/tb";
import {useEffect, useState} from "react";
import useArray from "../../CustomHooks/useArray.js";
import {BiBookAdd} from "react-icons/bi";
import {FaTrash} from "react-icons/fa";

export function SubgroupDashboard({idGroup, openModal, onHide}) {

	const [numPageMaterias, setNumPageMaterias] = useState(0);
	const [numPageDescripciones, setNumPageDescripciones] = useState(1);
	const [eventCreateMateria, activateEventCreateNewMateria] = useState(false);
	const [eventDeleteMateria, activateEventDeleteMateria] = useState(false);
	const [eventCreateSubMateria, activateEventCreateNewSubMateria] = useState(false);
	const [eventDeleteSubMateria, activateEventDeleteSubMateria] = useState(false);
	const { array, set, push, remove, update } = useArray([]);

	useEffect(() => {
		if(!openModal || idGroup === -1) return;
		const groupFilter = getGroupById(idGroup);
		set(groupFilter.materias);
		if(groupFilter.materias.length > 0)
			setNumPageMaterias(1);
	}, [openModal, idGroup]);

	useEffect(() => {
		if(!openModal || idGroup === -1 || array.length == 0) return;
		console.log("Array: ", array)
	}, [array]);

	useEffect(() => {
		if(!openModal || idGroup === -1 || !eventCreateMateria) return;
		setNumPageMaterias(array.length);
		setNumPageDescripciones(1)
		activateEventCreateNewMateria(false);
	}, [eventCreateMateria]);

	useEffect(() => {
		if(!openModal || idGroup === -1 || !eventDeleteMateria) return;
		if(numPageMaterias !== 1)
			setNumPageMaterias(numPageMaterias - 1);
		if(array.length === 0)
			setNumPageMaterias(0);
		setNumPageDescripciones(1);
		activateEventDeleteMateria(false);
	}, [eventDeleteMateria]);

	useEffect(() => {
		if(!eventCreateSubMateria) return;
		setNumPageDescripciones(numPageDescripciones + 1)
		activateEventCreateNewSubMateria(false);
	}, [eventCreateSubMateria]);

	useEffect(() => {
		if(!eventDeleteSubMateria) return;
		if(numPageDescripciones !== 1)
			setNumPageDescripciones(numPageDescripciones - 1);
		activateEventDeleteSubMateria(false);
	}, [eventDeleteSubMateria]);

	useEffect(() => {
		console.log("--------------- SUBGROUP changed ---------------")
		console.log("RESET...")
		setNumPageMaterias(0);
		setNumPageDescripciones(1);
	}, []);

	if (idGroup === -1) return; // No group selected

	const groupListed = getGroupById(idGroup);

	let hexColor = groupListed.color;

	function modifyModal(){
		document.getElementsByClassName('modal-content')[0].setAttribute('style', `box-shadow: 0px 5px 15px ${hexColor}; border-color: ${hexColor}`);
		const buttonSave = document.getElementById("modifyButtonSave");
		buttonSave.setAttribute('style', `background-color: ${hexColor}; border-color: ${hexColor}; color: ${adaptColorByHexColor(hexColor)}`);
	}

	function huboCambios(){
		const name = getValueById("groupName");
		return name !== groupListed.name || hexColor !== groupListed.color || array !== groupListed.materias;
	}

	function detectChanges(){
		if(huboCambios())
			document.getElementById("modifyButtonSave").removeAttribute('disabled');
		else
			document.getElementById("modifyButtonSave").setAttribute('disabled', 'true');
	}


	const handleOpen = () => {
		modifyModal();
		detectChanges();
	}

	function submitChanges(){
		const name = getValueById("groupName");
		const color = getValueById("groupColor");
		if(name !== groupListed.name) modifyGroupName(idGroup, name);
		if(color !== groupListed.color) modifyColorName(idGroup, color);
		if(array !== groupListed.materias) {
			console.log("Verificando datos de las materias...")
		}
		onHide();
	}

	const prevPageGlobal = () => {
		if (numPageMaterias > 1) setNumPageMaterias(numPageMaterias - 1);
		setNumPageDescripciones(1)
	}

	const nextPageGlobal = () => {
		if (numPageMaterias < array.length) setNumPageMaterias(numPageMaterias + 1);
		setNumPageDescripciones(1)
	}

	const nextPageDescripciones = () => {
		if (numPageDescripciones < array[numPageMaterias - 1].descripciones_por_dia.length) setNumPageDescripciones(numPageDescripciones + 1);
	}

	const prevPageDescripciones = () => {
		if (numPageDescripciones > 1) setNumPageDescripciones(numPageDescripciones - 1);
	}

	const createSubMateria = () => {
		console.log("Creando nueva submateria...")
		if(typeof array[numPageMaterias - 1] === "undefined") return; // No materia selected
		const newData =
			{
			dia: "",
			inicio: "",
			fin: "",
			ajustes: [],
		}
		const materia = array[numPageMaterias - 1];
		materia.descripciones_por_dia.push(newData);
		update(numPageMaterias - 1, materia);
		activateEventCreateNewSubMateria(true);
	}

	const obtenerDiaDeLaSemana = () => {
		if(typeof array[numPageMaterias - 1] === "undefined") return 1;
		if(typeof array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1] === "undefined") return 1;
		return array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1].dia;
	}

	const obtenerHoraInicio = () => {
		if(typeof array[numPageMaterias - 1] === "undefined") return "";
		if(typeof array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1] === "undefined") return "";
		return array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1].inicio;
	}

	const obtenerHoraFin = () => {
		if(typeof array[numPageMaterias - 1] === "undefined") return "";
		if(typeof array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1] === "undefined") return "";
		return array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1].fin;
	}

	const deleteSubMateria = () => {
		console.log("Eliminando submateria...")
		if(typeof array[numPageMaterias - 1] === "undefined") return; // No materia selected

		const materia = array[numPageMaterias - 1];
		// TODO: si estaba en el primer elemento crea uno nuevo
		if(materia.descripciones_por_dia.length === 1){
			materia.descripciones_por_dia = [
				{
					dia: "",
					inicio: "",
					fin: "",
					ajustes: [],
				}
			]
			update(numPageMaterias - 1, materia);
			activateEventDeleteSubMateria(true);
			return;
		}
		materia.descripciones_por_dia.splice(numPageDescripciones - 1, 1);
		update(numPageMaterias - 1, materia);
		activateEventDeleteSubMateria(true);
	}

	const canMoveToBackPageSubmateria = () => {
		if (typeof array[numPageMaterias - 1] === "undefined") return false;
		return numPageDescripciones === 1 || array[numPageMaterias - 1].descripciones_por_dia.length === 0;
	}

	const canMoveToNextPageSubmateria = () => {
		if (typeof array[numPageMaterias - 1] === "undefined") return false;
		return numPageDescripciones === array[numPageMaterias - 1].descripciones_por_dia.length || array[numPageMaterias - 1].descripciones_por_dia.length === 0;
	}

	const createNewMateria = () => {
		console.log("Creando nueva materia...")
		const newData = {
			descripciones_generales: [],
			descripciones_por_dia : [
				{
					dia: "",
					inicio: "",
					fin: "",
					ajustes: [],
				}
			],
		}
		push(newData);
		activateEventCreateNewMateria(true);
	}

	const deleteCurrentMateria = () => {
		console.log(`Eliminando materia ${numPageMaterias}...`)
		remove(numPageMaterias - 1);
		activateEventDeleteMateria(true);
	}

	const handleClose = () => {
		setNumPageMaterias(0);
		setNumPageDescripciones(1);
		onHide();
	}

	return (
		<Modal
			show={openModal}
			onHide={handleClose}
			onShow={handleOpen}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>

			<Modal.Header closeButton>
				<InputGroup>
					<InputGroup.Text id="basic-addon1">Modificando...</InputGroup.Text>

					{/* Text form */}
					<Form.Control
						id="groupName"
						placeholder={groupListed.name}
						defaultValue={groupListed.name}
						type='text'
						onChange={detectChanges}
					/>
				</InputGroup>

				{/* Color form */}

				<Form.Control
					type="color"
					defaultValue={hexColor}
					id='groupColor'
					onChange={ (e) => {
						hexColor = e.target.value;
						modifyModal();
						detectChanges();
					}}
				/>

			</Modal.Header>

			{/* Body */}
			<Modal.Body>
				<div
					className='border rounded'
				>
					<div
						className='d-flex border rounded p-1'
					>

						<HiFolderAdd
							size={30}
							onClick={createNewMateria}
						/>

						<Pagination
							size='sm'
							className='m-auto'
						>
							<Pagination.Prev
								onClick={prevPageGlobal}
								disabled={numPageMaterias === 1 || array.length === 0}
							/>
							<Pagination.Item active>{numPageMaterias}</Pagination.Item>
							<Pagination.Next
								onClick={nextPageGlobal}
								disabled={numPageMaterias === array.length || array.length === 0}
							/>
						</Pagination>

						<TbTrashXFilled
							size={30}
							onClick={deleteCurrentMateria}
						/>

					</div>

					{/* End Create Materia Global */}

					{
						numPageMaterias === 0 ?
							<div className='d-flex p-3' >
								<span	className='m-auto'>
									Crea una nueva materia para personalizar...
								</span>
							</div>
							:
							<>

								{/* Descripciones generales */}

								<div
									className='border rounded m-2'
								>
										<div className='d-flex  p-1'>
											<span
												className='m-auto'
											>
												Descripciones generales
											</span>
												<BiBookAdd
													size={30}
													onClick={() => {
														if(typeof array[numPageMaterias - 1] === "undefined") return; // No materia selected
														console.log("Creando descripción general...")
														console.log("NumPageMaterias: ", numPageMaterias)
														const newData = {
															mostrar_en_tabla: true,
															titulo: "",
														}
														const materia = array[numPageMaterias - 1];
														materia.descripciones_generales.push(newData);
														update(numPageMaterias - 1, materia);
														console.log("Descripción general creada")
													}}
												/>

										</div>
									<hr
										style={{margin: 5}}
									/>

										<div
											className='container p-2'
										>
											<div
												className='row p-2'
											>
												{
													(typeof array[numPageMaterias - 1] === "undefined" || array[numPageMaterias - 1].descripciones_generales.length === 0)
														?
															<span className='mx-auto text-center'>Crea una descripción nueva!</span>
														:
													array[numPageMaterias - 1].descripciones_generales.map((descripcion, index) => (
																	<InputGroup className="p-1 col-6" style={{width: '50%'}} key={index} id={`${index}`}>
																		<InputGroup.Checkbox
																			aria-label="Añadir en tabla"
																			checked={descripcion.mostrar_en_tabla}
																			onChange={() => {
																				const materia = array[numPageMaterias - 1];
																				materia.descripciones_generales[index].mostrar_en_tabla = !materia.descripciones_generales[index].mostrar_en_tabla;
																				update(numPageMaterias - 1, materia);
																			}}
																		/>
																		<Form.Control aria-label="Valor a mostrar" placeholder='key' value={descripcion.titulo} onChange={
																			(e) => {
																				const materia = array[numPageMaterias - 1];
																				materia.descripciones_generales[index].titulo = e.target.value;
																				update(numPageMaterias - 1, materia);
																			}
																		} />
																		<InputGroup.Text
																			aria-label='Eliminar descripción de la lista'
																		>
																			<FaTrash
																				size={20}
																				onClick={() => {
																					console.log(`Eliminando descripción general ${index}...`)
																					const materia = array[numPageMaterias - 1];
																					materia.descripciones_generales.splice(index, 1);
																					update(numPageMaterias - 1, materia);
																				}}
																			/>
																		</InputGroup.Text>
																	</InputGroup>
																))

														}
											</div>

										</div>

								</div>

								{/* Descripciones por día */}

								<div
									className='border rounded m-2'
								>
									<div className='border rounded p-1 d-flex flex-column'>

										<span className='text-center'>
											Descripciones por día
										</span>

										<hr
											style={{margin: 5}}
										/>

										<section
											className='d-flex'
										>

											<HiFolderAdd
												size={30}
												onClick={createSubMateria}
											/>

											<Pagination
												size='sm'
												className='m-auto'
											>
												<Pagination.Prev
													onClick={prevPageDescripciones}
													disabled={canMoveToBackPageSubmateria()}
												/>
												<Pagination.Item active>{numPageDescripciones}</Pagination.Item>
												<Pagination.Next
													onClick={nextPageDescripciones}
													disabled={canMoveToNextPageSubmateria()}
												/>
											</Pagination>

											<TbTrashXFilled
												size={30}
												onClick={deleteSubMateria}
											/>

										</section>
									</div>

									<div
										className='border rounded m-2'
									>
										<div
											className='d-flex'
										>
											<span className='mx-auto'>
												Horarios
											</span>
										</div>
										<hr
											style={{margin: '3px'}}
										/>

										<div
											className='d-flex flex-column'
										>
											<Form.Group
												className='p-1 mx-auto'
												style={{
													width: '90%',
												}}
											>
												<Form.Label>
													Día de la semana
												</Form.Label>
												<Form.Select
													value={obtenerDiaDeLaSemana()}
													onChange={(e) => {
														const materia = array[numPageMaterias - 1];
														materia.descripciones_por_dia[numPageDescripciones - 1].dia = e.target.value;
														update(numPageMaterias - 1, materia);
													}}
												>
													<option value='1' label={'Lunes'} />
													<option value='2' label={'Martes'} />
													<option value='3' label={'Miércoles'} />
													<option value='4' label={'Jueves'} />
													<option value='5' label={'Viernes'} />
													<option value='6' label={'Sábado'} />
													<option value='7' label={'Domingo'} />
												</Form.Select>
											</Form.Group>

											<hr
												style={{margin: '3px'}}
											/>

											<section
												className='d-flex mx-auto'
											>
												<Form.Group
													className='p-2'
												>
													<Form.Label>
														Hora inicio
													</Form.Label>
													<Form.Control
														type='time'
														value={obtenerHoraInicio()}
														onChange={(e) => {
															const materia = array[numPageMaterias - 1];
															materia.descripciones_por_dia[numPageDescripciones - 1].inicio = e.target.value;
															update(numPageMaterias - 1, materia);
														}
													}
														max={obtenerHoraInicio()}
													/>
												</Form.Group>
												<Form.Group
													className='p-2'
												>
													<Form.Label>
																Hora Fin
													</Form.Label>
													<Form.Control
														type='time'
														value={obtenerHoraFin()}
														onChange={(e) => {
															const materia = array[numPageMaterias - 1];
															materia.descripciones_por_dia[numPageDescripciones - 1].fin = e.target.value;
															update(numPageMaterias - 1, materia);
														}
													}
														min={obtenerHoraInicio()}
													/>
												</Form.Group>
											</section>
										</div>

									</div>

									{/* Sub anotaciones */}

									<div
										className='border rounded m-2'
									>
										<div className='d-flex  p-1'>
											<span
												className='m-auto'
											>
												Ajustes
											</span>
											<BiBookAdd
												size={30}
												onClick={() => {
													if(typeof array[numPageMaterias - 1] === "undefined") return; // No materia selected
													if(typeof array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1] === "undefined") return;
													const newData = {
														mostrar_en_tabla: true,
														titulo: "",
													}
													const materia = array[numPageMaterias - 1];
													materia.descripciones_por_dia[numPageDescripciones - 1].ajustes.push(newData);
													update(numPageMaterias - 1, materia);
												}}
											/>

										</div>
										<hr
											style={{margin: 5}}
										/>

										<div
											className='container p-2'
										>
											<div
												className='row p-2'
											>
												{
													(typeof array[numPageMaterias - 1] === "undefined" || typeof array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1] === "undefined" || array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1].ajustes.length === 0)
														?
														<span className='mx-auto text-center'>Crea un ajuste nuevo!</span>
														:
														array[numPageMaterias - 1].descripciones_por_dia[numPageDescripciones - 1].ajustes.map((descripcion, index) => (
															<InputGroup className="p-1 col-6" style={{width: '50%'}} key={index} id={`${index}`}>
																<InputGroup.Checkbox
																	aria-label="Añadir en tabla"
																	checked={descripcion.mostrar_en_tabla}
																	onChange={() => {
																		const materia = array[numPageMaterias - 1];
																		materia.descripciones_por_dia[numPageDescripciones - 1].ajustes[index].mostrar_en_tabla = !materia.descripciones_por_dia[numPageDescripciones - 1].ajustes[index].mostrar_en_tabla;
																		update(numPageMaterias - 1, materia);
																	}}
																/>
																<Form.Control aria-label="Valor a mostrar" placeholder='key' value={descripcion.titulo} onChange={
																	(e) => {
																		const materia = array[numPageMaterias - 1];
																		materia.descripciones_por_dia[numPageDescripciones - 1].ajustes[index].titulo = e.target.value;
																		update(numPageMaterias - 1, materia);
																	}
																} />
																<InputGroup.Text
																	aria-label='Eliminar descripción de la lista'
																>
																	<FaTrash
																		size={20}
																		onClick={() => {
																			console.log(`Eliminando descripción general ${index}...`)
																			const materia = array[numPageMaterias - 1];
																			materia.descripciones_por_dia[numPageDescripciones - 1].ajustes.splice(index, 1);
																			update(numPageMaterias - 1, materia);
																		}}
																	/>
																</InputGroup.Text>
															</InputGroup>
														))

												}
											</div>

										</div>

									</div>

								</div>
						</>
}

				</div>

			</Modal.Body>

			<Modal.Footer>
				<Button variant="danger"
								onClick={onHide}
				>
					❌ Cancelar cambios
				</Button>
				<Button onClick={submitChanges} id='modifyButtonSave'>
					💾 Guardar cambios
				</Button>
			</Modal.Footer>

		</Modal>
	)
}