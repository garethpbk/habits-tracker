import Habits from "./habits"

export const habitsMutations = {
  Mutation: {
    async addHabit(_, { habit }) {
      try {
        const newHabit = await Habits.create({
          ...habit,
        })

        return newHabit
      } catch (e) {
        console.log(e)
      }
    },

    async addEvent(_, { habitId, date }) {
      try {
        date.setHours(0, 0, 0, 0)
        const habit = await Habits.findOneAndUpdate(
          {
            _id: habitId,
            "events.date": {
              $ne: date,
            },
          },
          {
            $addToSet: {
              events: {
                date,
              },
            },
          }
        )
        return habit
      } catch (e) {
        console.log("e", e)
      }
    },
    async removeEvent(_, { habitId, eventId }) {
      try {
        const hait = await Habits.findOneAndUpdate(
          {
            _id: habitId,
          },
          {
            $pull: {
              events: {
                _id: eventId,
              },
            },
          }
        )
        return habit
      } catch (e) {
        console.log("e", e)
      }
    },
  },
}
