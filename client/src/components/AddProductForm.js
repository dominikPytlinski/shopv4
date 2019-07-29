import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Query from 'react-apollo/Query';

import Loading from './Loading';

import { GET_CATEGORIES_QUERY } from '../queries/Queries';

class AddProductForm extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            name: '',
            desc: '',
            img: '',
            price: 0,
            dropzoneText: "Drag 'n' drop some files here, or click to select files",
            file: null
        }
    }

    uploadFile = (file) => {
        this.setState({ 
            dropzoneText: file.name,
            file: file
         });
    }

    submitHandler = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div className="add-product-form">
                <form onSubmit={this.submitHandler}>
                    <div className="form-control">
                        <label htmlFor="name">Nazwa:</label>
                        <input value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} type="text" id="name" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="desc">Opis:</label>
                        <textarea value={this.state.desc} onChange={(e) => this.setState({ desc: e.target.value })} id="desc"></textarea>
                    </div>
                    <div className="form-control">
                        <label htmlFor="price">Cena: </label>
                        <input value={this.state.price} onChange={(e) => this.setState({ price: e.target.value })} type="number" id="price" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="img">Zdjęcie: </label>
                        <Dropzone
                            onDrop={acceptedFiles => this.uploadFile(acceptedFiles[0])}
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
                            <Query
                                query={GET_CATEGORIES_QUERY}
                            >
                                {
                                    ({ loading, error, data }) => {
                                        if(loading) return <option><Loading /></option>
                                        if(error) return <p>{error.message}</p>

                                        return data.categories.map(category => {
                                            return <option key={category.id}>{category.name}</option>
                                        })
                                    }
                                }
                            </Query>
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
