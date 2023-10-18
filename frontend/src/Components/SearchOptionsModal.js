import { useReducer } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { catalogChildrenTree, catalogs, colors, materials, status, brands, VideoGameRatings } from '../lib/lib'


function SearchOptionsModal({ searchingState, onHideSearchOptionsModal, showSearchOptionsModal }) {


    //Searching Reducer *ZMIENIA STANY JAK COŚ*
    const searchingReducer = (searchingStates, action) => {
        switch (action.type) {
            case 'CHANGE_SELECTED_COLOR':
                return { ...searchingStates, colorIDs: action.newState }
            case 'CHANGE_SELECTED_MATERIAL':
                return { ...searchingStates, materialIDs: action.newState }
            case 'CHANGE_SELECTED_ITEMSTATUS':
                return { ...searchingStates, statusIDs: action.newState }
            case 'CHANGE_SELECTED_CATALOGUE':
                return { ...searchingStates, catalogIDs: action.newState }
            case 'CHANGE_SELECTED_VIDEOGAMERATING':
                return { ...searchingStates, videoGameRatingIDs: action.newState }
            case 'CHANGE_SELECTED_BRAND':
                return { ...searchingStates, brandIDs: action.newState }
            default:
                return
        }
    }

    const [searchingStates, dispatch] = useReducer(searchingReducer, searchingState)
    console.log(searchingStates)

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
                    <select value={searchingStates.colorIDs} onChange={(e) => dispatch({ type: 'CHANGE_SELECTED_COLOR', newState: e.target.value })} className="form-select ms-2 mb-3 mt-3" id="inputGroupSelect01">
                        <option>Select a color</option>
                        {colors.map(color => (
                            <option key={color.id} value={color.id}>{color.title}</option>
                        ))}
                    </select>
                    <select value={searchingStates.materialIDs} onChange={(e) => dispatch({ type: 'CHANGE_SELECTED_MATERIAL', newState: e.target.value })} className="form-select ms-2 mb-3" id="inputGroupSelect01">
                        <option>Select a material</option>
                        {materials.map(material => (
                            <option key={material.id} value={material.id}>{material.title}</option>
                        ))}
                    </select>
                    <select value={searchingStates.statusIDs} onChange={(e) => dispatch({ type: 'CHANGE_SELECTED_ITEMSTATUS', newState: e.target.value })} className="form-select ms-2 mb-3" id="inputGroupSelect01">
                        <option>Select item status</option>
                        {status.map(stat => (
                            <option key={stat.id} value={stat.id}>{stat.title}</option>
                        ))}
                    </select>
                    <select value={searchingStates.catalogIDs} onChange={(e) => dispatch({ type: 'CHANGE_SELECTED_CATALOGUE', newState: e.target.value })} className="form-select ms-2 mb-3" id="inputGroupSelect01">
                        <option>Select a catalogue</option>
                        {Object.entries(catalogChildrenTree).map(([id, group]) => (
                            <optgroup label={catalogs[id]?.title} key={id}>
                                {group.map(entryId => (
                                    <option value={entryId} key={entryId}>
                                        {catalogs[entryId]?.title}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                    <select value={searchingStates.videoGameRatingIDs} onChange={(e) => dispatch({ type: 'CHANGE_SELECTED_VIDEOGAMERATING', newState: e.target.value })} className="form-select ms-2 mb-3" id="inputGroupSelect01">
                        <option>Select a videoGameRating</option>
                        {VideoGameRatings.map(VideoGameRating => (
                            <option key={VideoGameRating.id} value={VideoGameRating.id}>{VideoGameRating.title}</option>
                        ))}
                    </select>
                    <select value={searchingStates.brandIDs} onChange={(e) => dispatch({ type: 'CHANGE_SELECTED_BRAND', newState: e.target.value })} className="form-select ms-2 mb-3" id="inputGroupSelect01">
                        <option>Select a brand</option>
                        {brands.map(brand => (
                            <option key={brand.id} value={brand.id}>{brand.title}</option>
                        ))}
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button>Save</Button>
            </Modal.Footer>
        </Modal>

    )
}



export default SearchOptionsModal;