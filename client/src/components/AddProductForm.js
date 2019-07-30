import React, { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone';
import Query from 'react-apollo/Query';
import axios from 'axios';

import Loading from './Loading';

import { GET_CATEGORIES_QUERY } from '../queries/Queries';

class AddProductForm extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            name: '',
            desc: '',
            price: 0,
            img: '',
            categoryId: ''
        }
    }

    uploadFile = async (file) => {
        let formData = new FormData();
        formData.append('img', file);

        const res = await axios.post('http://localhost:4000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        this.setState({ img: res.data.path });
    }

    submitHandler = (e) => {
        e.preventDefault();

        const{ name, desc, price, img, categoryId } = this.state;

        this.props.addProduct({
            variables: {
                name,
                desc,
                price,
                img,
                categoryId
            }
        });
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
                        <input value={this.state.price} onChange={(e) => this.setState({ price: parseFloat(e.target.value) })} type="number" id="price" />
                    </div>
                    <div className="form-control">
                        <Fragment>
                            <label htmlFor="img">Zdjęcie: </label>
                            {
                                (this.state.img) ? 
                                <div className="img-min">
                                    <img src={this.state.img} alt="produt" />
                                </div> :
                                <Dropzone
                                    onDrop={acceptedFiles => this.uploadFile(acceptedFiles[0])}
                                >
                                    {
                                        ({ getRootProps, getInputProps }) => {
                                            return(
                                                <section>
                                                    <div {...getRootProps()}>
                                                        <input {...getInputProps()} />
                                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                                    </div>
                                                </section>
                                            )
                                        }
                                    }
                                </Dropzone>
                            }
                        </Fragment>
                    </div>
                    <div className="form-control">
                        <label htmlFor="categoryId">Kategoria</label>
                        <select id="categoryId" onChange={(e) => this.setState({ categoryId: e.target.value })} >
                            <option>Wybierz</option>
                            <Query
                                query={GET_CATEGORIES_QUERY}
                            >
                                {
                                    ({ loading, error, data }) => {
                                        if(loading) return <option><Loading /></option>
                                        if(error) return <p>{error.message}</p>

                                        return data.categories.map(category => {
                                            return <option key={category.id} value={category.id}>{category.name}</option>
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
