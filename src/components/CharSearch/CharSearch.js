import { useState } from 'react';
import { Link } from 'react-router';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';

import useMarvelService from '../../services/MarvelService';

import "./charSearch.scss"

const CharSearch = () => {
    const [charId, setCharId] = useState(null);

    const [serachClassName, setSearchClassName] = useState("search");
    const [charName, setCharName] = useState(null);
    const {error, loading, getCharacterByName, clearError} = useMarvelService();

    const onFindChar = (charNameSearch) => {
        clearError();
        setCharId(null);

        if (!serachClassName.includes('search__increased')) {
            setSearchClassName(serachClassName => `${serachClassName} search__increased`);
        }

        setCharName(charNameSearch);
        getCharacterByName(charNameSearch).then(onLoadedChar);
    }

    const onLoadedChar = (charList) => {
        if (charList.length > 0) {
            setCharId(charList[0].id);
            setCharName(charList[0].name);
        }
    }

    const pending = loading && <div className='error'>Loading...</div>
    const errorMessage = !loading && (error ? <div className='error'>Something went wrong</div> :
        (charName && !charId) && (
            <div className='error'>The character was not found. Check the name and try again</div>
    ))

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
                onSubmit={values => onFindChar(values.charName)}
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
                    <button
                        className="button button__main search__button"
                        type='submit'
                        disabled={loading}
                    >
                        <div className="inner">find</div>
                    </button>
                    <ErrorMessage className="error" name="charName" component="div" />
                </Form>
            </Formik>

            {pending}
            {errorMessage}

            {(charId && !loading) && (
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