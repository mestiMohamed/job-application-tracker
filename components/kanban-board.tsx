"use client";

import {Board, Column, JobApplication} from "@/lib/models/models.types";
import {
    ArrowLeft, ArrowRight,
    Award,
    Calendar,
    CheckCircle2,
    Mic,
    MoreHorizontal,
    MoreVertical,
    Trash2,
    XCircle,
} from "lucide-react";

import {Button} from "@/components/ui/button";
import type {CarouselApi} from "@/components/ui/carousel";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import CreateJobApplicationDialog from "@/components/create-job-application-dialog";

interface KanbanBoardProps {
    board: Board;
    userId: string;
}

interface ColConfig {
    color: string;
    icon: React.ReactNode;
}

interface ColConfig {
    color: string;
    icon: React.ReactNode;
}

const COLUMN_CONFIG: Array<ColConfig> = [
    {
        color: "bg-cyan-500",
        icon: <Calendar className="h-4 w-4"/>,
    },
    {
        color: "bg-purple-500",
        icon: <CheckCircle2 className="h-4 w-4"/>,
    },
    {
        color: "bg-green-500",
        icon: <Mic className="h-4 w-4"/>,
    },
    {
        color: "bg-yellow-500",
        icon: <Award className="h-4 w-4"/>,
    },
    {
        color: "bg-red-500",
        icon: <XCircle className="h-4 w-4"/>,
    },
];

function DroppableColumn({column, config, boardId, key}: {
    column: Column,
    config: ColConfig,
    boardId: string,
    key: string
}) {
    return (
        /*<Card>
            <CardHeader className={`${config.color}`}>
                <div>
                    <div>
                        {config.icon}
                        <CardTitle>
                            {column.name}
                        </CardTitle>
                    </div>


                </div>
            </CardHeader>
        </Card>*/

        <CarouselItem
            key={key}
            className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
        >


            <Card
                className="min-w-[300px] flex-shrink-0 shadow-md p-0">
                <CardHeader className={`${config.color} text-white rounded-t-lg pb-3 pt-3`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {config.icon}
                            <CardTitle className="text-white text-base font-semibold">{column.name}</CardTitle>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger >
                                <Button variant={"ghost"} size={"icon"} className="h-6 w-6 text-white hover:bg-white/20"><MoreVertical className="h-4 w-4"/></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align={"end"}>
                                <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4"/> Delet Column
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent className={"space-y-2 pt-4 bg-gray-50/50 min-h-[400px] rounded-b-lg"}>
                    <CreateJobApplicationDialog columnId={column._id} boardId={boardId} />
                </CardContent>
            </Card>

        </CarouselItem>
    )
}

export default function KanbanBoard({board, userId}: KanbanBoardProps) {

    const columns = board.columns;
    const [carouselApi, setCarouselApi] = useState<CarouselApi>();
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (!carouselApi) {
            return;
        }
        const updateSelection = () => {
            setCanScrollPrev(carouselApi.canScrollPrev());
            setCanScrollNext(carouselApi.canScrollNext());
            setCurrentSlide(carouselApi.selectedScrollSnap());
        };
        updateSelection();
        carouselApi.on("select", updateSelection);
        return () => {
            carouselApi.off("select", updateSelection);
        };
    }, [carouselApi]);

    return (
        <>
            <section className={"py-10"}>
                <div className={"container mx-"}>
                    <div className={"mb-8 flex items-end justify-between md:mb-14 lg:mb-16"}>
                        <div className={"flex flex-col gap-4"}>
                            <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">
                                {board.name}
                            </h2>
                        </div>
                        <div className="hidden shrink-0 gap-2 md:flex">
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                    carouselApi?.scrollPrev();
                                }}
                                disabled={!canScrollPrev}
                                className="disabled:pointer-events-auto"
                            >
                                <ArrowLeft className="size-5"/>
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                    carouselApi?.scrollNext();
                                }}
                                disabled={!canScrollNext}
                                className="disabled:pointer-events-auto"
                            >
                                <ArrowRight className="size-5"/>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={"w-full"}>
                    <Carousel
                        setApi={setCarouselApi}
                        opts={{
                            breakpoints: {
                                "(max-width: 768px)": {
                                    dragFree: true,
                                },
                            },
                        }}
                    >

                        <CarouselContent
                            className="ml-0 2xl:mr-[max(0rem,calc(50vw-700px))] 2xl:ml-[max(8rem,calc(50vw-700px))]">
                            {
                                columns.map((col, key) => {
                                    const config = COLUMN_CONFIG[key] || {
                                        color: "bg-cyan-500",
                                        icon: <Calendar className="h-4 w-4"/>,
                                    };

                                    return <DroppableColumn key={key} column={col} config={config}
                                                            boardId={board._id}/>;
                                })
                            }
                        </CarouselContent>

                    </Carousel>
                    <div className="mt-8 flex justify-center gap-2">
                        {COLUMN_CONFIG.map((_, index) => (
                            <button
                                key={index}
                                className={`h-2 w-2 rounded-full transition-colors ${
                                    currentSlide === index ? "bg-primary" : "bg-primary/20"
                                }`}
                                onClick={() => carouselApi?.scrollTo(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}