<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\InternshipRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InternshipRepository::class)]
#[ApiResource]
class Internship
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $year = null;

    #[ORM\ManyToOne(inversedBy: 'internships')]
    private ?User $intern = null;

    #[ORM\Column(type: Types::SMALLINT, nullable: true)]
    private ?int $notation = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $commentary = null;

    #[ORM\ManyToOne(inversedBy: 'internships')]
    private ?Tutor $tutor = null;

    #[ORM\ManyToOne(inversedBy: 'internships')]
    private ?Company $company = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getYear(): ?\DateTimeInterface
    {
        return $this->year;
    }

    public function setYear(\DateTimeInterface $year): static
    {
        $this->year = $year;

        return $this;
    }

    public function getIntern(): ?User
    {
        return $this->intern;
    }

    public function setIntern(?User $intern): static
    {
        $this->intern = $intern;

        return $this;
    }

    public function getNotation(): ?int
    {
        return $this->notation;
    }

    public function setNotation(?int $notation): static
    {
        $this->notation = $notation;

        return $this;
    }

    public function getCommentary(): ?string
    {
        return $this->commentary;
    }

    public function setCommentary(?string $commentary): static
    {
        $this->commentary = $commentary;

        return $this;
    }

    public function getTutor(): ?Tutor
    {
        return $this->tutor;
    }

    public function setTutor(?Tutor $tutor): static
    {
        $this->tutor = $tutor;

        return $this;
    }

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(?Company $company): static
    {
        $this->company = $company;

        return $this;
    }
}
