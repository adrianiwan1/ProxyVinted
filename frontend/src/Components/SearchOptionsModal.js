import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { catalogChildrenTree, catalogs, colors, materials, status, brands, VideoGameRatings } from '../lib/lib'

function SearchOptionsModal({ searchingState, onHideSearchOptionsModal, showSearchOptionsModal, dispatch }) {

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
                    <select value={searchingState.colorIDs} onChange={(e) => dispatch({ type: 'CHANGE_SELECTED_COLOR', newState: e.target.value })} className="form-select ms-2 mb-3 mt-3" id="inputGroupSelect01">
                        <option>Select a color</option>
                        {colors.map(color => (
                            <option key={color.id} value={color.id}>{color.title}</option>
                        ))}
                    </select>
                    <select value={searchingState.materialIDs} onChange={(e) => dispatch({ type: 'CHANGE_SELECTED_MATERIAL', newState: e.target.value })} className="form-select ms-2 mb-3" id="inputGroupSelect01">
                        <option>Select a material</option>
                        {materials.map(material => (
                            <option key={material.id} value={material.id}>{material.title}</option>
                        ))}
                    </select>
                    <select value={searchingState.statusIDs} onChange={(e) => dispatch({ type: 'CHANGE_SELECTED_ITEMSTATUS', newState: e.target.value })} className="form-select ms-2 mb-3" id="inputGroupSelect01">
                        <option>Select item status</option>
                        {status.map(stat => (
                            <option key={stat.id} value={stat.id}>{stat.title}</option>
                        ))}
                    </select>
                    <select value={searchingState.catalogIDs} onChange={(e) => dispatch({ type: 'CHANGE_SELECTED_CATALOGUE', newState: e.target.value })} className="form-select ms-2 mb-3" id="inputGroupSelect01">
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
                    <select value={searchingState.videoGameRatingIDs} onChange={(e) => dispatch({ type: 'CHANGE_SELECTED_VIDEOGAMERATING', newState: e.target.value })} className="form-select ms-2 mb-3" id="inputGroupSelect01">
                        <option>Select a videoGameRating</option>
                        {VideoGameRatings.map(VideoGameRating => (
                            <option key={VideoGameRating.id} value={VideoGameRating.id}>{VideoGameRating.title}</option>
                        ))}
                    </select>
                    <select value={searchingState.brandIDs} onChange={(e) => dispatch({ type: 'CHANGE_SELECTED_BRAND', newState: e.target.value })} className="form-select ms-2 mb-3" id="inputGroupSelect01">
                        <option>Select a brand</option>
                        {brands.map(brand => (
                            <option key={brand.id} value={brand.id}>{brand.title}</option>
                        ))}
                    </select>
                    <select value={searchingState.order} onChange={(e) => dispatch({ type: 'CHANGE_SELECTED_ORDER', newState: e.target.value })} className="form-select ms-2 mb-3" id="inputGroupSelect01">
                        <option>Select a brand</option>
                        <option value='price_high_to_low'>Price: High to Low</option>
                        <option value='price_low_to_high'>Price: Low to High</option>
                        <option value='newest_first'>Newest First</option>
                        <option value='relevance'>Relevance</option>
                        <option value='favorites'>Favorites</option>
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onHideSearchOptionsModal(false)}>Save</Button>
            </Modal.Footer>
        </Modal>

    )
}



export default SearchOptionsModal;