import {Tooltip} from "react-tooltip";
import {BiExport} from "react-icons/bi";
import {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {getGroupList} from "../../../Data/groupManager.js";
import {Form, InputGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {IoIosCopy} from "react-icons/io";
import confetti from 'canvas-confetti'
import JSONCrush from "jsoncrush";
import {toast} from "react-toastify";
import {compressToEncodedURIComponent} from "lz-string";
import {FormattedMessage} from "react-intl";
import { compressGroupList } from "../../Import/Utils.js";

export const ExportarGrupos = ({theme, linkCopySuccess, }) => {

  const [openModal, setOpenModal] = useState(false);
  const [copyLink, setCopyLink] = useState("");

  useEffect(() => {
    if(!openModal) return;
    setCopyLink(generateLink());
    console.log("Nuevo link: " + copyLink);
  }, [openModal, copyLink]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(copyLink).then(() => {
      toast.info(
        linkCopySuccess,
        {
          icon: '💾',
          position: "top-left",
          autoClose: 750,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: theme
        });
      confetti()
    });
  }

  const generateLink = () => {
    // const test = getGroupList();
    // const testCompresse = compressGroupList(test);
    // const testUncompress = unCompressGroupList(testCompresse);
    // console.log("Comprimido: ")
    // console.log(testCompresse)
    // console.log("Descomprimido")
    // console.log(testUncompress)
    // console.log("Mismo del inicio?:" + (JSON.stringify(testUncompress) === JSON.stringify(test)))

    const groupList = JSON.stringify(compressGroupList(getGroupList()));
    const groupListToJSONCrush = compressToEncodedURIComponent(JSONCrush.crush((groupList)));
    // const groupListToJSONCrushUncompress = compressToEncodedURIComponent(JSONCrush.crush((JSON.stringify(getGroupList()))));

    // console.log("Tamaño comprimido: " + groupListToJSONCrush.length)
    // console.log("Tamaño descomprimido: " + groupListToJSONCrushUncompress.length)

    return window.location.href + "#/import/?groupList=" + groupListToJSONCrush;
  }

  return (
    <>

      <Modal
        show={openModal}
        onHide={() => {setOpenModal(false)}}
        size=''
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id={"linkModalTitle"} />
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <InputGroup className="">
            <Button variant="outline-secondary" id="button-addon1"
                    onClick={()=>copyToClipboard()}
            >
              <IoIosCopy size={20} className='mx-auto text-center'/>
              <span className='mx-auto text-center text-body p-2'>
                <FormattedMessage id={"linkModalButtonCopy"} />
              </span>
            </Button>
            <Form.Control
              readOnly
              value={copyLink}
              onClick={()=>copyToClipboard()}
            />
          </InputGroup>

        </Modal.Body>

        {/* Footer */}
        <Modal.Footer>
          <button className='btn bg-danger text-white' onClick={()=>setOpenModal(false)}>
            <FormattedMessage id={"linkModalButtonClose"} />
          </button>
        </Modal.Footer>

      </Modal>


      <BiExport
        data-tooltip-id='copiarTodosLosGruposBtn'
        onClick={()=>setOpenModal(true)}
        size={30}
        className='OTHBtn'
      />

      <Tooltip
        id="copiarTodosLosGruposBtn"
        noArrow
        place={'bottom'}
        border={'1px solid #ffffff'}
        style={{
          userSelect: 'none',
          borderRadius: '20px',
        }}
      >
        <FormattedMessage id={"linkTooltip"} />
      </Tooltip>

    </>
  )
}