function skillsMember() {
  // Get the member's skills
  const memberSkills = await member.getSkills();
  const skillNames = memberSkills.map((skill) => skill.name);
  console.log(skillNames);
}
