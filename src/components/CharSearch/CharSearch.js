import { useState } from 'react';
import { Link } from 'react-router';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';

import useMarvelService from '../../services/MarvelService';

import "./charSearch.scss"

const setContent = (process, Component, props) => {
    switch (process) {
        case 'waiting':
            return null
        case 'loading':
            return <div className='error'>Loading...</div>
        case 'confirmed':
            return <Component {...props} />
        case 'error':
            return <div className='error'>Something went wrong</div>
        case 'notFound':
                return <div className='error'>The character was not found. Check the name and try again</div>
        default:
            throw new Error('Unexpected process state')
    }
}

const CharSearch = () => {
    const [charId, setCharId] = useState(null);
    const [serachClassName, setSearchClassName] = useState("search");
    const [charName, setCharName] = useState(null);
    const {getCharacterByName, clearError, process, setProcess} = useMarvelService();

    const onFindChar = (charNameSearch) => {
        clearError();

        if (!serachClassName.includes('search__increased')) {
            setSearchClassName(serachClassName => `${serachClassName} search__increased`);
        }

        getCharacterByName(charNameSearch)
            .then(onLoadedChar);
    }

    const onLoadedChar = (charList) => {
        if (charList.length > 0) {
            setCharId(charList[0].id);
            setCharName(charList[0].name);
            setProcess('confirmed');
        } else {
            setProcess('notFound');
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
                        disabled={process === 'loading'}
                    >
                        <div className="inner">find</div>
                    </button>
                    <ErrorMessage className="error" name="charName" component="div" />
                </Form>
            </Formik>

            {setContent(process, View, {charId, charName})}
        </div>
    )
}

const View = ({charId, charName}) => {
    return (
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
    );
}

export default CharSearch;