import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class AddProductForm extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            dropzoneText: "Drag 'n' drop some files here, or click to select files"
        }
    }

    render() {
        return (
            <div className="add-product-form">
                <form>
                    <div className="form-control">
                        <label htmlFor="name">Nazwa:</label>
                        <input type="text" id="name" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="desc">Opis:</label>
                        <textarea id="desc"></textarea>
                    </div>
                    <div className="form-control">
                        <label htmlFor="price">Cena: </label>
                        <input type="text" id="price" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="img">Zdjęcie: </label>
                        <Dropzone
                            onDrop={acceptedFiles => console.log(acceptedFiles)}
                        >
                            {
                                ({ getRootProps, getInputProps }) => {
                                    return(
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <p>{this.state.dropzoneText}</p>
                                            </div>
                                        </section>
                                    )
                                }
                            }
                        </Dropzone>
                    </div>
                    <div className="form-control">
                        <label htmlFor="categoryId">Kategoria</label>
                        <select id="categoryId">
                            <option>Wybierz</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <button type="submit" className="btn btn-primary" >Zapisz</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddProductForm;
