import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Header from '../templates/header/header.jsx';
import Footer from '../templates/footer/footer.jsx';
import CharacterDetails from '../atoms/CharacterPageAtoms/CharacterClassDetails.jsx';
import FavCharacterFunction from '../atoms/CharacterPageAtoms/FavCharacterFunction.jsx';
import '../organisms/CharacterPage.sass';

const CharacterPage = ({ user }) => { 
  const { characterName } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const charactersRef = collection(firestore, "Characters");
        const querySnapshot = await getDocs(charactersRef);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.name === characterName) {
            setCharacter(data);
          }
        });
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    };

    fetchCharacter();
  }, [characterName]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="character-page" style={{ backgroundImage: `url(${character.bg})` }}>
        <h1>{character.title}</h1>
        <img className="character-art" src={character.ga} alt={character.name} />
      </div>
      <div className="content">
        <CharacterDetails character={character} />
        <FavCharacterFunction user={user} character={character} />
      </div>
      <Footer />
    </div>
  );
};

export default CharacterPage;