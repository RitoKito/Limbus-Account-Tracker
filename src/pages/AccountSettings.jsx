import { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import FilterPanel from '@/components/FilterPanel/FilterPanel.jsx'
import SinnerPanel from '@/components/SinnerPanel/SinnerPanel.jsx'

import useFilteredSinners from '@/hooks/useFilteredSinners.jsx'

import { AccountStateContext } from '@/context/AccountStateContext.jsx'
import CurrencyPanel from '@/components/CurrencyPanel/CurrencyPanel.jsx'
import { CharacterDataContext } from '@/context/CharacterDataContext'
import { DispensableContext } from '@/context/DispensableContext'
import ImportPanel from '@/components/ImportPanel/ImportPanel'

const AccountSettings = () => {
  const { characters } = useContext(CharacterDataContext);

  const {
    setSinnerShards,
    setNomCrate,
    addToWishlist,
    removeFromWishlist,
    markOwned,
    markUnowned,
    wishlistSet,
    ownedSet,
    getExportAccountState,
    resetAccountState,
    setNewDefaultState,
  } = useContext(AccountStateContext);

  const accountStateHandlers = useMemo(() => ({
    addToWishlist: addToWishlist,
    removeFromWishlist: removeFromWishlist,
    markOwned: markOwned,
    markUnowned: markUnowned,
  }),[
    addToWishlist, removeFromWishlist,
    markOwned, markUnowned
  ]);

  const { dispensable } = useContext(DispensableContext);

  const [sinners, setSinners] = useState(characters);

  const [filters, setFilters] = useState({
    ownedEnabled: false,
    owned: {},
    wishlistedEnabled: false,
    wishlisted: {},
    rarities: [],
    damageTypes: [],
    sinTypes: [],
    sinnerNames: [],
    searchTerm: '',
  });

  const [initDone, setInitDone] = useState(false);

  const [filterCount, setFilterCounter] = useState(0);

  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const currentValues = prev[category];

      if(Array.isArray(currentValues)) {
        return {
          ...prev,
          [category]: currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value]
        };
      }

      return {
        ...prev,
        [category]: value
      };
    });
  };

  const toggleOwned = () => {
    if(filters['ownedEnabled']){
      toggleFilter('ownedEnabled', false);
      toggleFilter('owned', {});
    }
    else{
      toggleFilter('ownedEnabled', true);
      toggleFilter('owned', ownedSet);
    }
  }

  const toggleWishlisted = () => {
    if(filters['wishlistedEnabled']){
      toggleFilter('wishlistedEnabled', false);
      toggleFilter('wishlisted', {});
    }
    else{
      toggleFilter('wishlistedEnabled', true);
      toggleFilter('wishlisted', wishlistSet);
    }
  }

  const toggleRarity = (rarity) => {
    toggleFilter('rarities', rarity);
  };

  const toggleDamageType = (type) => {
    toggleFilter('damageTypes', type);
  };

  const toggleSinType = (type) => {
    toggleFilter('sinTypes', type);
  }

  const toggleSinner = (sinner) => {
    toggleFilter('sinnerNames', sinner)
  }

  const setSearchTerm = (input) => {
    toggleFilter('searchTerm', input)
  }

  const clearFilters = () => {
    setFilters((prev) => ({
      ...prev,
      rarities: [],
      damageTypes: [],
      sinTypes: [],
      sinnerNames: [],
    }));
  }
  const filteredSinners = useFilteredSinners(sinners, filters)

  // Mark 0 rarity IDs owned
  // as all players own them by default
  useEffect(() => {
    if(!initDone){
      Object.values(sinners).forEach(sinner => {
        sinner.identities
          .filter(identity => identity.rarity === 0)
          .forEach(identity => {markOwned(sinner, identity)});
      });

     setInitDone(true);
    };

  }, [sinners, initDone]);

  useEffect(() => {
    if (initDone) {
      setNewDefaultState();
    }
  }, [initDone])

  useEffect(() => {
    const filterCount = Object.entries(filters).reduce((acc, [key, value]) => {
      if(key === 'searchTerm') return acc;
      return acc + (Array.isArray(value) ? value.length : 0)
    }, 0);

    setFilterCounter(filterCount);
  }, [filters, sinners]);

  const importAccountState = useCallback((accountStateString) => {
    const stateParse = JSON.parse(accountStateString);

    resetAccountState();

    setNomCrate(stateParse.nomCrate);

    const identityMap = new Map();

    stateParse.owned.forEach(sinner => {
      setSinnerShards(sinner.id, stateParse.shards[sinner.id])
      
      const innerMap = new Map(
        sinners[sinner.id].identities.map(identity => [identity.id, identity])
      );

      identityMap.set(sinner.id, innerMap);

      sinner.identities.forEach(identity => {
        const i = identityMap.get(sinner.id).get(identity.id);
        if(identity.id === i.id){
          markOwned(sinner, i);
        }
      })
    })

    stateParse.wishlist.forEach(sinner => {
      sinner.identities.forEach(identity => {
        const i = identityMap.get(sinner.id).get(identity.id);
        if(identity.id === i.id){
          addToWishlist(sinner, i);
        }
      })
    })

  });

  const exportAccountState = useCallback(() => {
    const exportState = JSON.stringify(getExportAccountState());

    const date = new Date();
    const formattedDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`
    const filename = 'LimbusAccountState_' + formattedDate;

    const blob = new Blob([exportState], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  });

  return (
    <main className='main-content'>
      <h1 className='title'>Import/Export</h1>
      <section>
        <ImportPanel
          importAccountState={importAccountState}
          exportAccountState={exportAccountState}
          resetAccountState={resetAccountState}
          accountState={JSON.stringify(getExportAccountState())}
        />
      </section>


      <h1 className='title'>Currency</h1>
      <section>
        <CurrencyPanel sinners={sinners}/>
      </section>

      <h1 className='title'>Identities</h1>
      <section>
        <h2 className='section-title'>
          {`Filters (${filterCount})`}
        </h2>
        <FilterPanel
          filters={filters}
          sinners={sinners}
          toggleOwned={toggleOwned}
          toggleWishlisted={toggleWishlisted}
          toggleRarity={toggleRarity}
          toggleDamageType={toggleDamageType}
          toggleSin={toggleSinType}
          toggleSinner={toggleSinner}
          setSearchTerm={setSearchTerm}
          clearFilters={clearFilters}
        />
      </section>

      <section>
        <h2 className='section-title'>
          {`Identities (${filteredSinners.idCount}):`}
        </h2>
        {filteredSinners.sinners.map((sinner) => (
          <SinnerPanel 
            key={sinner.id}
            sinner={sinner}
            accountStateHandlers={accountStateHandlers}
            wishlistSet={wishlistSet.sinners[sinner.id]?.identities??new Set()}
            ownedSet={ownedSet.sinners[sinner.id]?.identities??new Set()}
            dispensable={dispensable[sinner.id]??{}} 
          />
        ))}
      </section>
    </main>
  )
}

export default AccountSettings
