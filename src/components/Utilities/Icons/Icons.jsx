import React from "react";

// import * as AiReactIcons from "react-icons/ai";
// import * as BiReactIcons from "react-icons/bi";
import * as BsReactIcons from "react-icons/bs";
// import * as CgReactIcons from "react-icons/cg";
// import * as CiReactIcons from "react-icons/ci";
// import * as DiReactIcons from "react-icons/di";
import * as FaReactIcons from "react-icons/fa";
// import * as FcReactIcons from "react-icons/fc";
import * as SiReactIcons from "react-icons/si";
// import * as FiReactIcons from "react-icons/fi";
// import * as GiReactIcons from "react-icons/gi";
// import * as GoReactIcons from "react-icons/go";
// import * as GrReactIcons from "react-icons/gr";
// import * as HiReactIcons from "react-icons/hi";
// import * as Hi2ReactIcons from "react-icons/hi2";
// import * as ImReactIcons from "react-icons/im";
// import * as IoReactIcons from "react-icons/io";
// import * as Io5ReactIcons from "react-icons/io5";
// import * as LibReactIcons from "react-icons/lib";
// import * as LuReactIcons from "react-icons/lu";
// import * as MdReactIcons from "react-icons/md";
// import * as RiReactIcons from "react-icons/ri";
// import * as RxReactIcons from "react-icons/rx";
// import * as SlReactIcons from "react-icons/sl";
// import * as TbReactIcons from "react-icons/tb";
// import * as TfiReactIcons from "react-icons/tfi";
// import * as TiReactIcons from "react-icons/ti";
// import * as VscReactIcons from "react-icons/vsc";
// import * as WiReactIcons from "react-icons/wi";

export const iconFamilies = {
    // AiReactIcons: AiReactIcons,
    // BiReactIcons: BiReactIcons,
    BsReactIcons: BsReactIcons,
    // CgReactIcons: CgReactIcons,
    // CiReactIcons: CiReactIcons,
    // DiReactIcons: DiReactIcons,
    FaReactIcons: FaReactIcons,
    // FcReactIcons: FcReactIcons,
    SiReactIcons: SiReactIcons,
    // FiReactIcons: FiReactIcons,
    // GiReactIcons: GiReactIcons,
    // GoReactIcons: GoReactIcons,
    // GrReactIcons: GrReactIcons,
    // HiReactIcons: HiReactIcons,
    // Hi2ReactIcons: Hi2ReactIcons,
    // ImReactIcons: ImReactIcons,
    // IoReactIcons: IoReactIcons,
    // Io5ReactIcons: Io5ReactIcons,
    // LibReactIcons: LibReactIcons,
    // LuReactIcons: LuReactIcons,
    // MdReactIcons: MdReactIcons,
    // RiReactIcons: RiReactIcons,
    // RxReactIcons: RxReactIcons,
    // SlReactIcons: SlReactIcons,
    // TbReactIcons: TbReactIcons,
    // TfiReactIcons: TfiReactIcons,
    // TiReactIcons: TiReactIcons,
    // VscReactIcons: VscReactIcons,
    // WiReactIcons: WiReactIcons,
};

export function iconMapFunction(str) {
    let data = str.split("");
    for (let i = 1; i < data.length; i++) {
        if (data[i] === data[i].toUpperCase()) {
            return data.slice(0, i).join("") + "ReactIcons";
        }
    }
}

const Icons = ({ family, name }) => {
    return React.createElement(iconFamilies[family][name]);
};

export default Icons;
