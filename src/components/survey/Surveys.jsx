import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { getQuestionApi } from 'src/hooks/getQuestion';
import { setQuestionResultApi } from 'src/store/actions/campaign';
import { getLanguage } from 'src/utils/api';
import Card from '../skeletons/Card';
import { ProgressBar } from 'react-bootstrap';
import { translate } from 'src/utils';

const Surveys = () => {

    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptionQuesId, setSelectedOptionQuesId] = useState('');
    const [submittedQuestionId, setSubmittedQuestionId] = useState(null);
    const [submittedAnswer, setsubmittedAnswer] = useState([])

    const [submittedQuestionIds, setSubmittedQuestionIds] = useState([]);

    const [answeredOnce, setAnsweredOnce] = useState(false)

    let { id: language_id } = getLanguage();

    // api call
    const getQuestion = async () => {
        try {
            const { data } = await getQuestionApi.getQuestion({
                language_id: language_id,
            });
            return data.data;
        } catch (error) {
            console.log(error);
        }
    };

    // react query
    const { data: questionsData } = useQuery({
        queryKey: ['getQuestion'],
        queryFn: getQuestion,
    });

    const handleOptionClick = (options) => {
        setSelectedOption(options.id);
        setSelectedOptionQuesId(options?.question_id)
        setQuestionResultApi({
            language_id: language_id,
            question_id: options?.question_id,
            option_id: options?.id,
            onSuccess: async (response) => { },
            onError: (error) => {
                console.log(error);
                toast.error(error);
            },
        });
    };

    const getQuestionResultApi = async (id) => {
        try {
            const { data } = await getQuestionApi.getQuestionResult({
                language_id: language_id,
                question_id: id,
            });
            if (!answeredOnce) {
                setsubmittedAnswer(data?.data)
                setAnsweredOnce(true)
            }
            return data.data;
        } catch (error) {
            console.log(error);
        }
    };

    const { data: answers, isLoading } = useQuery({
        queryKey: ['getQuestionResult', submittedQuestionId],
        queryFn: submittedQuestionId ? () => getQuestionResultApi(submittedQuestionId) : () => [],
        enabled: !!submittedQuestionId,
    });

    const handleSubmit = (id) => {
        if (selectedOption && selectedOptionQuesId === id) {
            setSubmittedQuestionId(id);
            setSubmittedQuestionIds((prevIds) => [...prevIds, id]);
        } else {
            toast.error(translate('optSel'))
        }
    };

    return (
        <section className='surveysSect'>
            {questionsData &&
                questionsData.slice(0, 2)
                    .map((survey) => {
                        if (submittedQuestionId === null || submittedQuestionId !== survey.id) {
                            return (
                                <div className='' key={survey.id}>
                                    <div className="card">
                                        <span className='question'>{survey?.question}</span>

                                        {
                                            submittedQuestionIds.includes(survey.id) ?
                                                <>
                                                    {submittedAnswer &&
                                                        submittedAnswer[0]?.survey_options?.map((options) => (
                                                            <div key={options.id}>
                                                                <span>
                                                                    <ProgressBar now={options.percentage} />
                                                                </span>
                                                                <span className='percentage'>
                                                                    {parseFloat(options.percentage) % 1 === 0
                                                                        ? options.percentage
                                                                        : parseFloat(options.percentage).toFixed(2)}%
                                                                </span>
                                                            </div>
                                                        ))}
                                                </>
                                                :
                                                <>

                                                    {survey?.survey_options.map((options) => {
                                                        return (
                                                            <span
                                                                key={options.id}
                                                                className={`options ${options.id === selectedOption ? 'selectedOption' : ''
                                                                    }`}
                                                                onClick={() => handleOptionClick(options)}
                                                            >
                                                                {options?.options}
                                                            </span>
                                                        );
                                                    })}
                                                    <button className='submitBtn commonBtn' onClick={() => handleSubmit(survey.id,)}>
                                                        Submit
                                                    </button>
                                                </>
                                        }

                                    </div>
                                </div>
                            );
                        }
                        return (
                            <div className='' key={survey.id}>
                                <div className="card resultCard">
                                    <span className='question'>{survey?.question}</span>
                                    {isLoading ? (
                                        <Card />
                                    ) : (
                                        answers &&
                                        answers[0]?.survey_options?.map((options) => (
                                            <div key={options.id}>
                                                <span>
                                                    <ProgressBar now={options.percentage} />
                                                </span>
                                                <span className='percentage'>
                                                    {parseFloat(options.percentage) % 1 === 0
                                                        ? options.percentage
                                                        : parseFloat(options.percentage).toFixed(2)}%
                                                </span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        );
                    })}
        </section>
    );
};

export default Surveys;

