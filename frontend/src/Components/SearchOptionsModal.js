import { useState, useReducer } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function SearchOptionsModal({ searchingState, onHideSearchOptionsModal, showSearchOptionsModal }) {

    //Searching Reducer *ZMIENIA STANY JAK COŚ*
    const searchingReducer = (searchingStates, action) => {
        switch (action.type) {
            case 'CHANGE_SELECTED_COLOR':
                return { ...searchingStates, selectedColor: action.newState }
            case 'CHANGE_SELECTED_MATERIAL':
                return { ...searchingStates, selectedMaterial: action.newState }
            case 'CHANGE_SELECTED_ITEMSTATUS':
                return { ...searchingStates, selectedItemStatus: action.newState }
            case 'CHANGE_SELECTED_CATALOGUE':
                return { ...searchingStates, selectedCatalogue: action.newState }
            case 'CHANGE_SELECTED_SIZE':
                return { ...searchingStates, selectedSize: action.newState }
            case 'CHANGE_SELECTED_VIDEOGAMERATING':
                return { ...searchingStates, selectedVideoGameRating: action.newState }
            case 'CHANGE_SELECTED_BRAND':
                return { ...searchingStates, selectedBrand: action.newState }
            default:
                return
        }
    }

    const [searchingStates, dispatch] = useReducer(searchingReducer, searchingState)

    return (

        <Modal
            show={showSearchOptionsModal}
            onHide={onHideSearchOptionsModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    DETAILS
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center">
                <div className="col-10 d-flex flex-column">
                    <select value={searchingStates.selectedColor} onChange={(e) => dispatch({ type: 'CHANGE_SELECTED_COLOR', newState: e.target.value })} className="form-select ms-2 mb-3 mt-3" id="inputGroupSelect01">
                        <option >Select a color</option>
                        <option>Niebieski</option>
                        <option>Czerwony</option>
                        {/* MORE OPTIONS */}
                    </select>
                    <select value={searchingStates.selectedMaterial} onChange={(e) => dispatch({ type: 'CHANGE_SELECTED_MATERIAL', newState: e.target.value })} className="form-select ms-2 mb-3" id="inputGroupSelect01">
                        <option>Select a material</option>
                        <option>Jedwab</option>
                    </select>
                    <select value={searchingStates.selectedItemStatus} onChange={(e) => dispatch({ type: 'CHANGE_SELECTED_ITEMSTATUS', newState: e.target.value })} className="form-select ms-2 mb-3" id="inputGroupSelect01">
                        <option>Select item status</option>
                        <option>Status</option>
                    </select>
                    <select value={searchingStates.selectedCatalogue} onChange={(e) => dispatch({ type: 'CHANGE_SELECTED_CATALOGUE', newState: e.target.value })} className="form-select ms-2 mb-3" id="inputGroupSelect01">
                        <option>Select a catalogue</option>
                        <option>Katalog</option>
                    </select>
                    <select value={searchingStates.selectedSize} onChange={(e) => dispatch({ type: 'CHANGE_SELECTED_SIZE', newState: e.target.value })} className="form-select ms-2 mb-3" id="inputGroupSelect01">
                        <option>Select a size</option>
                        <option>baldzik</option>
                        <option>small</option>
                        <option>medium</option>
                        <option>big</option>
                        <option>giant</option>
                    </select>
                    <select value={searchingStates.selectedVideoGameRating} onChange={(e) => dispatch({ type: 'CHANGE_SELECTED_VIDEOGAMERATING', newState: e.target.value })} className="form-select ms-2 mb-3" id="inputGroupSelect01">
                        <option>Select a videoGameRating</option>
                        <option>10/10</option>
                    </select>
                    <select value={searchingStates.selectedBrand} onChange={(e) => dispatch({ type: 'CHANGE_SELECTED_BRAND', newState: e.target.value })} className="form-select ms-2 mb-3" id="inputGroupSelect01">
                        <option>Select a brand</option>
                        <option>Ford</option>
                        <option>Mercedes</option>
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button>Close</Button>
            </Modal.Footer>
        </Modal>

    )
}



export default SearchOptionsModal;