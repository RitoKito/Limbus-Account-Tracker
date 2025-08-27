import { createContext, useEffect, useMemo, useState, useRef } from "react";
import { calcDispensableIdentitiesAll } from "@/utils/ShardUtils";
import { calcDispensableIdentitiesSingle } from "@/utils/ShardUtils";

export const DispensableContext = createContext();

export const DispensableProvider = ({ children, sinners, shards, nomCrate }) => {
	const [dispensable, setDispensable] = useState({})

  useEffect(() => {
    const initialDispensable = {};

    sinners.forEach(sinner => {
      initialDispensable[sinner.name] = 0;
    });

    setDispensable(initialDispensable);
  }, [sinners]);


	const prevShardsRef = useRef();
	const prevNomCrateRef = useRef();
  useEffect(() => {
		const nomCrateChanged = prevNomCrateRef.current !== nomCrate;

		if(!prevShardsRef.current || nomCrateChanged) {
			const result = calcDispensableIdentitiesAll(sinners, shards, nomCrate);
			setDispensable(result);
		}
		else {
			const prevShards = prevShardsRef.current;

			Object.keys(shards).forEach(sinnerId => {
				if(shards[sinnerId] !== prevShards[sinnerId]) {
					const newValue = calcDispensableIdentitiesSingle(sinnerId, shards, nomCrate);
					setDispensable(prev => ({
						...prev,
						[sinnerId]: newValue,
					}));
				}
			});
		}

		prevShardsRef.current = {...shards};
		prevNomCrateRef.current = nomCrate;
  }, [sinners, nomCrate, shards]);

	const dispensableContextValue = useMemo(() => ({
		dispensable: dispensable,
		setDispensable: setDispensable,
	}), [dispensable, setDispensable]);

	return (
		<DispensableContext.Provider value={dispensableContextValue}>
			{children}
		</DispensableContext.Provider>
	);
}