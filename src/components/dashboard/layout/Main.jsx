const Main = ({children}) => {
    return (
      <div className="flex-1 overflow-hidden overflow-y-scroll border">
        {children}
      </div>
    );
  }
  
  export default Main;
  