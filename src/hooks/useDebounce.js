function useDebounce(cb,delay=3000){

    let timerid;
    // setTimeout(()=>{
    //     clearInterval(timerid);
    //     cb()
    // },delay);
    return(...args)=>{
        console.log(args);
        clearTimeout(timerid);
        timerid=setInterval(() => {
            cb(...args);
        }, delay);
    }
}
export default useDebounce;