import React, { Component } from 'react';

import PageHeader from './PageHeader';
import PageContent from './PageContent';

class Products extends Component {
    render() {
        return (
            <main>
                <PageHeader />
                <PageContent />
            </main>
        )
    }
}

export default Products;
