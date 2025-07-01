import Image from 'next/image';
import React from 'react';
import { IntroductionItem } from './Introduction';

type Props = {
    item: IntroductionItem;
};

const IntroCard = ({ item }: Props) => {
    return (
        <div className="grid grid-cols-1 lg:flex gap-10 rounded-2xl">
            <div className="mx-auto w-[290px] h-[194px] overflow-hidden rounded-xl">
                <Image
                    src={item.image || '/images/fallback.jpg'}
                    alt={item.title}
                    width={290}
                    height={194}
                    className="object-cover w-[290px] h-[194px] rounded-xl"
                />
            </div>
            <div className="flex flex-col gap-8 flex-1 text-black">
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="text-[13px] font-medium leading-relaxed text-justify">
                    {item.description}
                </p>
            </div>
        </div>

    );
};

export default IntroCard;
