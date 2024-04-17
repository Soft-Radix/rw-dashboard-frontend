import React from 'react'
import InputField from '../InputField'
import { SearchIcon } from 'public/assets/icons/topBarIcons'

interface IProps {
    name: string,
    placeholder: string
}
function SearchInput({ name, placeholder }: IProps) {
    return (
        <div className="relative w-full mb-3 sm:mb-0 sm:w-max">
            <InputField
                name={name}
                placeholder={placeholder}
                className='common-inputField_v2 '
                inputProps={{
                    className: "ps-[4rem] w-full sm:w-[227px] ",
                }}
            />
            <SearchIcon
                width={18}
                height={18}
                className="absolute left-[2rem] sm:left-10 top-[26%] sm:top-[50%] translate-y-[-50%] text-para_light"
            />
        </div>
    )
}



export default SearchInput