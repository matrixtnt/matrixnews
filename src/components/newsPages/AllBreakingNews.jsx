"use client";
import Link from "next/link";
import BreadcrumbNav from "../breadcrumb/BreadcrumbNav";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "../../store/reducers/languageReducer";
import Skeleton from "react-loading-skeleton";
import { translate } from "../../utils";
import no_image from "../../../public/assets/images/no_image.jpeg";
import { AllBreakingNewsApi } from "src/hooks/allBreakingNewsApi";
import { access_key, getLanguage } from "src/utils/api";
import { useQuery } from "@tanstack/react-query";

const AllBreakingNews = () => {
    let { id: language_id } = getLanguage();
    useSelector(selectCurrentLanguage);

    // api call
    const getBreakingNewsApi = async () => {
        try {
            const { data } = await AllBreakingNewsApi.getBreakingNews({ language_id, access_key });
            return data.data;
        } catch (error) {
            console.log(error);
        }
    };

    // react query
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ["all-breaking-news", language_id, access_key],
        queryFn: getBreakingNewsApi,
    });

    // loading
    if (isLoading) {
        return (
            <span>
                <Skeleton height={200} count={3} />
            </span>
        );
    }

    // error
    if (isError) {
        return <span className="text-center my-5">{translate("nodatafound")}</span>
    }

    return (
        <>
            <BreadcrumbNav SecondElement={translate("breakingNewsLbl")} ThirdElement="0" />
            <div id="BNV-main">
                <div id="BNV-content" className="container">
                    <div className="row my-5">
                        {data &&
                            data.map((element) => (
                                <div className="col-md-4 col-12" key={element.id}>
                                    <Link id="Link-all" href={`/breaking-news/${element.id}`}>
                                        <div id="BNV-card" className="card">
                                            <img id="BNV-card-image" src={element.image ? element.image : no_image} className="card-img" alt="..." />
                                            <div id="BNV-card-body" className="card-body">
                                                <h5 id="BNV-card-title" className="card-title">
                                                    {element.title.slice(0, 150)}...
                                                </h5>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllBreakingNews;
