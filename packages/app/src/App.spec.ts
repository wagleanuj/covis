import React from "react"
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'

import App from "./App"
test('should first', async () => { 
    render(React.createElement(App, {}))
    expect(await screen.getByText('App is here')).toBeInTheDocument()
 })