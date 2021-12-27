import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CategoryList } from './category/categoryList'
import {PostList} from './post/postList'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/board/index' exact component={CategoryList} />
            <Route path='/post/index' exact component={PostList} />
        </Switch>
    </BrowserRouter>
    , document.getElementById('app')
);
