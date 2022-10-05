import React from 'react';
import { Container } from 'react-bootstrap';
import TagsComponent from '../../components/Tables/TagsTable/TagsTable.js';
import './tags.css'
const Tags = () => {
    return (
        <div>
            <Container>
                <TagsComponent/>  
            </Container>
        </div>
    );
};

export default Tags;