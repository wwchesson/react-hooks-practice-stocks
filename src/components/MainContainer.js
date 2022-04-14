import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [filterBy, setFilterBy] = useState("Tech")

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then((data) => setStocks(data));
  }, []);

  function handlePortfolioEntry(newStock) {
    const stockToAdd = portfolioStocks.find(
      (stock) => stock.id === newStock.id
    );
    if (!stockToAdd) {
      setPortfolioStocks([...portfolioStocks, newStock]);
    }
  }

  function handleRemoveStock(oldStock) {
    const stockToRemove = portfolioStocks.filter(
      (stock) => stock.id !== oldStock.id
    );
    setPortfolioStocks(stockToRemove);
  }

  const sortedStocks = stocks.sort((stock1, stock2) => {
    if (sortBy === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name);
    } else {
      return stock1.price - stock2.price;
    }
  });

  const filteredStocks = sortedStocks.filter(stock => (
    stock.type === filterBy
  ))

  return (
    <div>
      <SearchBar onSort={setSortBy} sortBy={sortBy} filterBy={filterBy} onFilter={setFilterBy}/>
      <div className="row">
        <div className="col-8">
          <StockContainer
            stocks={filteredStocks}
            onAddToPortfolio={handlePortfolioEntry}
          />
        </div>
        <div className="col-4">
          <PortfolioContainer
            portfolioStocks={portfolioStocks}
            onRemoveStock={handleRemoveStock}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
