<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Group;
use App\Entity\User;
use Faker;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class AppFixtures extends Fixture
{
    private $passwordEncoder;

    public function __construct(UserPasswordHasherInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }
    public function load(ObjectManager $manager): void
    {
        
        $faker = Faker\Factory::create('fr_FR');
      
        $groups = [];

        $groupData = [
            ["type" => "TP", "num" => "1"],
            ["type" => "TP", "num" => "2"],
            ["type" => "TP", "num" => "3"],
            ["type" => "TP", "num" => "4"],
            ["type" => "TD", "num" => "1"],
            ["type" => "TD", "num" => "2"],
            ["type" => "TD", "num" => "3"],
            ["type" => "TD", "num" => "4"],
            ["type" => "LV", "num" => "Chinois"],
            ["type" => "LV", "num" => "Espagnol"],
        ];
        
        foreach ($groupData as $groupInfo) {
            $group = new Group();
            $group->setType($groupInfo['type']);
            $group->setNum($groupInfo['num']);
            $manager->persist($group);
            $groups[] = $group;  // Ajoute l'objet Group au tableau
        }
        $manager->flush();

        $user = array();

       
        for ($i=0; $i < 10; $i++) { 
           for ($j=0; $j < 10; $j++) { 
            
            
            $user[$i] = new User();
            $user[$i]->setFirstname($faker->firstName);
            $user[$i]->setLastname($faker->lastName);
            $user[$i]->setMail($faker->email);
            
            $user[$i]->setPassword(
                $this->passwordEncoder->hashPassword(
                    $user[$i],
                    "123456"
                ));

            $user[$i]->setUuid((String)$faker->uuid);
            $user[$i]->addGroup($groups[$j]);
            $manager->persist($user[$i]);
            $manager->flush();
            





           }
        }


        $manager->flush();
    }
}
