import React from "react";

import { test_data, test_func } from '../mutual/es-feature-test';
import axios from "axios";

const FeatureTest: React.FC = () => {
    const [state, setState] = React.useState(null);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        axios.post("/api/tester", test_data).then(
            resp => setState(resp.data['ok'])
        ).catch(
            error => setError(String(error))
        );
    }, []);
    return (
        <div>
            Note: all results should be true:
            <ul>
                <li>Client results: {String(test_func(test_data))}</li>
                <li>Server results: {String(state)}</li>
            </ul>
            {error}
        </div>
    );
};

export default FeatureTest;