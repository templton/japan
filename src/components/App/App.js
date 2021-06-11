import React from 'react';
import Container from '@material-ui/core/Container/index';
import {Navbar} from "../Navbar";
import {ProductShowcase} from "../ProductShowcase";
import Gpdr from '../Gpdr';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

(async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    const visitorId = result.visitorId;
    console.log(visitorId);
    console.log(result);
})();
function App() {
    return (
        <>
            <Navbar productCount={10}/>
            <Container fixed>
                <ProductShowcase/>
            </Container>
            <Gpdr/>
        </>
    );
}

export default App;
