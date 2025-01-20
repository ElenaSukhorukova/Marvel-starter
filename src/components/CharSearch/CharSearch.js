import { useState } from 'react';
import { Link } from 'react-router';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';

import "./charSearch.scss"

const CharSearch = (props) => {
    const [charId, setCharId] = useState(null);
    const [serachClassName, setSearchClassName] = useState("search");
    const [charName, setCharName] = useState(null);

    const findChar = (charNameSearch) => {
        if (!serachClassName.includes('search__increased')) {
            setSearchClassName(serachClassName => `${serachClassName} search__increased`);
        }

        setCharName(charNameSearch);

        const selectedChar = props.charList.find(function(char) {
           return char.name.toLowerCase().includes(charNameSearch.toLowerCase());
        });

        if (selectedChar) {
            setCharId(selectedChar.id);
            setCharName(selectedChar.name);
        }
    }

    return (
        <div className={serachClassName}>
            <div className="search__header">Or find a character by name:</div>

            <Formik
                initialValues = {{
                    charName: ''
                }}
                validationSchema = {
                    object({
                        charName: string().required('This field is required'),
                    })
                }
                onSubmit={values => findChar(values.charName)}
                validateOnChange={false}
                validateOnBlur={false}
            >
                <Form>
                    <Field
                        id='charName'
                        name='charName'
                        type='text'
                        placeholder="Enter name"
                    />
                    <button className="button button__main search__button" type='submit'>
                        <div className="inner">find</div>
                    </button>
                    <ErrorMessage className="error" name="charName" component="div" />
                </Form>
            </Formik>

            {(charName && !charId) && (
                <div className='error'>The character was not found. Check the name and try again</div>
            )}

            {charId && (
                <div className='success'>
                    <div className='success__text'>There is! Visit {charName} page?</div>
                    <Link
                        to={`/chars/${charId}`}
                        className="button button__secondary success__button"
                        type='button'
                    >
                        <div className="inner">TO PAGE</div>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default CharSearch;