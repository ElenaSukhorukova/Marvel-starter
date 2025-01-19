import { Formik, Form, Field, ErrorMessage } from 'formik';

import "./charSearch.scss"

const CharSearch = (props) => {
    const findChar = (charName) => {
        const selectedChar = props.chars.find(function(char) {
           return char.name.includes(charName)
        })

        console.log(selectedChar)

        if (selectedChar) {
            console.log(selectedChar)
        } else {

        }
    }

    return (
        <div className="search">
            <div className="search__header">Or find a character by name:</div>

            <Formik
                initialValues={{
                    charName: ''
                }}
                onSubmit={values => findChar(values.charName)}
            >
                <Form className='search__form'>
                    <Field
                        id='charName'
                        name='charName'
                        type='text'
                        placeholder="Enter name"
                    />
                    <ErrorMessage className="error" name="charName" component="div" />
                    <button className="button button__main button__long" type='submit'>
                        <div className="inner">find</div>
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

export default CharSearch;